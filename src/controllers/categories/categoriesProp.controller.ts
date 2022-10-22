import { Request, Response } from "express";
import CategoriesPropService from "../../services/category/categoriesProp.service";

const categoriesPropController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listProperties = await CategoriesPropService(id);

  return res.status(200).json(listProperties);
};

export default categoriesPropController;
