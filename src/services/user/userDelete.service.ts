import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  let users = await userRepository.find();

  let account = users.find((user) => user.id === id);

  await userRepository.update(account!.id, {
    isActive: false,
  });

  users = await userRepository.find();

  account = users.find((user) => user.id === id);

  return account;
};

export default userDeleteService;
