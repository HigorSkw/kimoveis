import { Router } from "express";
import propertiesCreateController from "../controllers/properties/propertiesCreate.controller";
import propertiesListController from "../controllers/properties/propertiesList.controller";
import { authUser } from "../middlewares/authUser.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post("", authUser, propertiesCreateController);
propertiesRoutes.get("", propertiesListController);

export default propertiesRoutes;
