import { Request, Response } from "express";
import propertyListService from "../../services/property/propertyList.service";

const propertiesListController = async (req: Request, res: Response) => {
  const listProperties = await propertyListService();

  return res.status(200).json(listProperties);
};

export default propertiesListController;
