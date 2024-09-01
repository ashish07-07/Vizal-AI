import express from "express";
import { Request } from "express";
import { Response } from "express";
import prisma from "../db";

const router = express.Router();

router.use(express.json());

router.post("/itemdetails", async function (req: Request, res: Response) {
  try {
    const body = req.body;
    console.log(body);

    const userdetails = await prisma.itemdetails.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stocknumber: body.stocknumber,
        category: body.category,
      },
    });

    console.log("added the item details in the database ");

    res.status(201).json({
      body,
    });
  } catch (e) {
    console.error("some thing went wrong check karlena ");
    console.log(e);
  }
});

export default router;
