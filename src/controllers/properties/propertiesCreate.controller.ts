import { Request, Response } from "express";
import { IPropertyRequest } from "../../interfaces/properties";
import propertyCreateService from "../../services/property/propertyCreate.service";

const propertiesCreateController = async (req: Request, res: Response) => {
  const property: IPropertyRequest = req.body;

  const newProperty = await propertyCreateService(property);

  return res.status(201).json(newProperty);
};

export default propertiesCreateController;
