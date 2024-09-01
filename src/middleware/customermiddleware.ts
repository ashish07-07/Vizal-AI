import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function cmiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ msg: "no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (e) {
    console.log(e);
  }
}
