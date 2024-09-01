import prisma from "../db";
import { NextFunction, Request, Response } from "express";
export async function Cronjobchecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  const saleid = body.saleid;

  const maximumitem = 3;
  const response = await prisma.sale.findFirst({
    where: {
      id: saleid,
    },
  });

  if (response?.status === "live") {
    next();
  } else {
    return res.status(401).json({
      message: "the sale is not live currently",
    });
  }
}
