import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyPatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (
    Object.keys(req.body).includes("id") ||
    Object.keys(req.body).includes("isActive") ||
    Object.keys(req.body).includes("isAdm")
  ) {
    return res.status(401).json({ message: "update not valid!" });
  }

  if (!token) {
    return res.status(401).json({ message: "token invalid!" });
  }
  const { id } = req.params;

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
    req.user = { isAdm: decoded.isAdm, id: decoded.sub };
  });

  if (req.user.isAdm) {
    return next();
  }

  if (req.user.id !== id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  next();
};
