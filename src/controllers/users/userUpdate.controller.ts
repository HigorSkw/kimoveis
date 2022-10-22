import { Request, Response } from "express";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { isAdm, isACtive, ...updateValues } = req.body;

  const user = await userUpdateService(id, updateValues);

  return res.status(200).json({ message: "Usuario atualizado" });
};

export default userUpdateController;
