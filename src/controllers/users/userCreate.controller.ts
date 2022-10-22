import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm } = req.newUser;
  const isActive = true;

  const newUser = await userCreateService({
    name,
    email,
    password,
    isAdm,
    isActive,
  });

  return res.status(201).send(instanceToPlain(newUser));
};

export default userCreateController;
