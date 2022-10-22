import { Request, Response } from "express";
import userListService from "../../services/user/userList.service";
import { instanceToPlain } from "class-transformer";

const userListController = async (req: Request, res: Response) => {
  const users = await userListService();

  return res.status(200).json(instanceToPlain(users));
};

export default userListController;
