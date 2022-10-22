import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";
import categoryCreateController from "../controllers/categories/categoriesCreate.controller";
import categoriesListController from "../controllers/categories/categoriesList.controller";
import categoriesPropController from "../controllers/categories/categoriesProp.controller";

const categoriesRoutes = Router();

categoriesRoutes.post("", authUser, categoryCreateController);

categoriesRoutes.get("", categoriesListController);

categoriesRoutes.get("/:id/properties", categoriesPropController);

export default categoriesRoutes;
