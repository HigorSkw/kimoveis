import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import schedulesCreateService from "../../services/schedules/schedulesCreate.service";
import jwt from "jsonwebtoken";
import { instanceToPlain } from "class-transformer";

const schduleCreateController = async (req: Request, res: Response) => {
  const schedule: IScheduleRequest = req.body;

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
    req.user = { isAdm: decoded.isAdm, id: decoded.sub };
  });

  const idUser = req.user.id;

  const newSchedule = await schedulesCreateService(schedule, idUser);

  return res
    .status(201)
    .json({ message: "Deu liga!", Schedule: instanceToPlain(newSchedule) });
};

export default schduleCreateController;
