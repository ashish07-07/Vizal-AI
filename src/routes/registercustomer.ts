import express from "express";
import jwt from "jsonwebtoken";
import prisma from "../db";
import bcrypt from "bcrypt";

const route = express.Router();

route.post("/register", async function (req, res) {
  try {
    const body = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const customer = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { email: customer.email },
      process.env.JWT_SECRET as string
    );

    console.log("User created successfully");

    res.status(201).json({
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Internal server error.",
    });
  }
});

export default route;
