import { Router } from "express";

const loginRoutes = Router();

import loginController from "../controllers/login/Login.controller";

loginRoutes.post("", loginController);

export default loginRoutes;
