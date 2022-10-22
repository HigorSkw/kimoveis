import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";
import { validadeDelete } from "../middlewares/validadeDelete.middleware";
import { userCreateSchema } from "../middlewares/validadeUserCreate.middleware";
import { validateUserCreate } from "../middlewares/validadeUserCreate.middleware";
import { verifyPatch } from "../middlewares/validadePatch.middleware";
import { AppError } from "../errors/ErrorHTTP";

const userRoutes = Router();

import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";

userRoutes.post("", validateUserCreate(userCreateSchema), userCreateController);

userRoutes.get("", authUser, userListController);

userRoutes.patch("/:id", verifyPatch, userUpdateController);

userRoutes.delete("/:id", validadeDelete, userDeleteController);

export default userRoutes;
