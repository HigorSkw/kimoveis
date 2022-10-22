import AppDataSource from "../../data-source";
import { IScheduleRequest } from "../../interfaces/schedules";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../errors/ErrorHTTP";
import { User } from "../../entities/user.entity";
import { Properties } from "../../entities/properties.entity";

const schedulesCreateService = async (
  { date, hour, propertyId }: IScheduleRequest,
  idUser: string
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Properties);

  const properties = await propertyRepository.find();
  const property = properties.find((el) => el.id === propertyId);

  const users = await userRepository.find();
  const user = users.find((el) => el.id === idUser);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newDate = new Date(date);

  const newHour = new Date(date);

  newHour.setHours(+hour.split(":")[0], +hour.split(":")[1]);

  const validandoDia = new Date(date).getDay();

  if (validandoDia === 0 || validandoDia === 6) {
    throw new AppError("Day invalid", 400);
  }

  const validandoHora = newHour.getHours();

  if (validandoHora <= 8 || validandoHora >= 18) {
    throw new AppError("Hour invalid", 400);
  }

  const schedules = await schedulesRepository.find();

  const validatedSchedules = schedules.find(
    (el) =>
      el.date.toString() === newDate.toString() &&
      el.hour.toString() === newHour.toString()
  );

  if (validatedSchedules) {
    throw new AppError("Conflit date or hour", 400);
  }

  const salveSchedule = schedulesRepository.create({
    date: newDate,
    hour: newHour,
    property,
    user,
  });

  const scheduleComplete = await schedulesRepository.save(salveSchedule);

  return scheduleComplete;
};

export default schedulesCreateService;
