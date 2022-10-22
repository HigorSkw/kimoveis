import { Request, Response } from "express";
import CategoriesListService from "../../services/category/categoryList.service";

const categoriesListController = async (req: Request, res: Response) => {
  const listCategories = await CategoriesListService();

  return res.status(200).json(listCategories);
};

export default categoriesListController;
