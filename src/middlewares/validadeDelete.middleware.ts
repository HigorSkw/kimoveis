import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const validadeDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  let { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    return res.status(404).json({
      message: "Invalid id",
    });
  } else if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  } else if (account.isActive == false) {
    return res.status(400).json({ message: "user is not active!" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
    req.user = { isAdm: decoded.isAdm, id: decoded.sub };
  });

  if (req.user.isAdm == false) {
    return res.status(403).json({ message: "user is not admin!" });
  }

  next();
};
