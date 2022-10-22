import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userDeleteService(id);

  return res.status(204).json(user);
};

export default userDeleteController;
