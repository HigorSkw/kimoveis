import { Request, Response } from "express";
import scheduleListService from "../../services/schedules//schedulesList.service";

const scheduleListController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedules = await scheduleListService(id);

  return res.status(200).json({ schedules });
};

export default scheduleListController;
