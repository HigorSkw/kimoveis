import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/ErrorHTTP";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
  isActive,
}: IUserCreate): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError("Email Already Exists", 400);
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.isAdm = isAdm;
  user.isActive = isActive;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default userCreateService;
