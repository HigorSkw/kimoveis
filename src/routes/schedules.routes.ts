import { Router } from "express";
import schduleCreateController from "../controllers/schedules/scheduleCreate.controller";
import scheduleListController from "../controllers/schedules/schdulesList.controller";
import { authUser } from "../middlewares/authUser.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", schduleCreateController);
schedulesRoutes.get("/properties/:id", authUser, scheduleListController);

export default schedulesRoutes;
