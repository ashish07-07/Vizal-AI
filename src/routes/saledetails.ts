import express from "express";
import { Request } from "express";
import { Response } from "express";
const router = express.Router();
import prisma from "../db";

router.post("/addsale", async function (req: Request, res: Response) {
  try {
    const body = req.body;
    console.log(body);

    const response = await prisma.sale.create({
      data: {
        name: body.name,
        starttime: new Date(body.starttime),
        status: body.status,
      },
    });

    console.log("Sale detail added successfully");

    res.status(201).json({
      response,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
