import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/ErrorHTTP";

const scheduleListService = async (id: string) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const schedules = await schedulesRepository.find({
    where: {
      property: {
        id: id,
      },
    },
    relations: {
      property: true,
      user: true,
    },
  });

  if (schedules.length === 0) {
    throw new AppError("Schedule not found", 404);
  }

  return schedules;
};

export default scheduleListService;
