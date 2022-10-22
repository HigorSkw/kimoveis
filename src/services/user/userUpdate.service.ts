import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/ErrorHTTP";

const userUpdateService = async (id: string, updateValues: any) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new AppError("User not Found", 404);
  }

  if (updateValues.password) {
    if (bcrypt.compareSync(updateValues.password, account!.password)) {
      throw new AppError("Inform a different password.");
    }
    const newPassword = bcrypt.hashSync(updateValues.password, 10);
  }

  await userRepository.update(account!.id, updateValues);

  return true;
};

export default userUpdateService;
