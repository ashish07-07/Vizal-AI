import express from "express";
import prisma from "../db";
import { cmiddleware } from "../middleware/customermiddleware";
import redisClient from "../redisclient/stock";

const route = express.Router();

async function handlepurchase(
  itemid: number,
  customerid: number,
  saleid: number,
  quantity: number,
  price: number,
  totalstock: number
) {
  const lockkey = `lock:item:${itemid}`;
  const queueKey = `queue:item:${itemid}`;

  const lock = await redisClient.set(lockkey, customerid, {
    NX: true,
    EX: 5,
  });

  if (lock) {
    try {
      console.log("processing purchase ");
      const transactiondetails = await prisma.transaction.create({
        data: {
          customerid: customerid,
          saleid: saleid,
          itemid: itemid,
          quantity: quantity,
          totalprice: price,
        },
      });

      const updatedStock = totalstock - quantity;

      console.log("transaction completed successfully");
      await redisClient.set("stocknumber", updatedStock);

      await prisma.itemsale.update({
        where: {
          saleid_itemid: {
            saleid: saleid,
            itemid: itemid,
          },
        },
        data: {
          stock: updatedStock,
        },
      });
    } catch (e) {
      console.error("Error processing purchase:", e);
    } finally {
      await redisClient.del(lockkey);

      const nextcustomer = await redisClient.lPop(queueKey);
      if (nextcustomer) {
        const { customerid, saleid, itemid, quantity, totalprice, totalstock } =
          JSON.parse(nextcustomer);
        await handlepurchase(
          itemid,
          customerid,
          saleid,
          quantity,
          totalprice,
          totalstock
        );
      }
    }
  } else {
    console.log(
      `Item is currently being purchased. ${customerid} is in the queue.`
    );
  }
}

route.post("/purchase", cmiddleware, async function (req, res) {
  const body = req.body;
  const saleid = body.saleid;
  const customerid = body.customerid;
  const quantity = body.quantity;
  const itemid = body.itemsaleid;
  const price = body.price;

  const maximumitem = 3;

  const stocksre = await prisma.itemsale.findFirst({
    where: {
      saleid: saleid,
      itemid: itemid,
    },
  });
  const totalstock = stocksre?.stock;

  if (totalstock && totalstock < quantity) {
    return res.status(401).json({
      msg: "Not that many items are available to order",
    });
  }
  if (quantity > maximumitem) {
    return res.status(401).json({
      msg: `You can only order a maximum of ${maximumitem} to maintain fairness.`,
    });
  }

  const queueKey = `queue:item:${itemid}`;
  const customerRequest = JSON.stringify({
    customerid,
    saleid,
    itemid,
    quantity,
    totalprice: price,
    totalstock,
  });

  await redisClient.rPush(queueKey, customerRequest);
  if (!totalstock) {
    return;
  }

  await handlepurchase(itemid, customerid, saleid, quantity, price, totalstock);
  if (totalstock) {
    await redisClient.set("stocknumber", totalstock);
  }

  res.status(200).json({ message: "Your request is being processed" });
});

export default route;
