import express from "express";
import { Request, Response } from "express";
import prisma from "../db";

const router = express.Router();

router.post("/saleitemdetails", async function (req: Request, res: Response) {
  const saleitemdata = req.body;
  console.log(saleitemdata.stock);

  try {
    const itemdetails = await prisma.itemdetails.findFirst({
      where: {
        id: saleitemdata.itemid,
      },
    });

    if (!itemdetails) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    console.log(itemdetails);

    if (itemdetails.stocknumber <= 0) {
      return res.status(400).json({
        message: "This item is out of stock.",
      });
    }

    if (itemdetails.stocknumber < saleitemdata.stock) {
      return res.status(400).json({
        message: `Please enter a valid stock number as the total stock of that item is only ${itemdetails.stocknumber}.`,
      });
    }

    const response = await prisma.itemsale.create({
      data: {
        saleid: saleitemdata.saleid,
        itemid: saleitemdata.itemid,
        stock: saleitemdata.stock,
      },
    });

    console.log("Sale item added successfully");

    const updatedItem = await prisma.itemdetails.update({
      where: {
        id: saleitemdata.itemid,
      },
      data: {
        stocknumber: itemdetails.stocknumber - saleitemdata.stock,
      },
    });

    return res.status(201).json({
      msg: response,
      updatedItem: updatedItem,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred while processing the request.",
    });
  }
});

export default router;
