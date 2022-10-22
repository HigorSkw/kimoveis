import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/ErrorHTTP";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError("Wrong email or password!", 403);
  }

  if (!bcrypt.compareSync(password, account!.password)) {
    throw new AppError("Wrong email or password!", 403);
  }

  const token = jwt.sign(
    { isAdm: account.isAdm },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1h",
      subject: account.id,
    }
  );

  return token;
};

export default loginService;
