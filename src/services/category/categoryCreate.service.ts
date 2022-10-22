import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/ErrorHTTP";

const categoryCreateService = async (name: string): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categories = await categoryRepository.find();

  const categoryAlreadyExists = categories.find(
    (category) => category.name === name
  );

  if (categoryAlreadyExists) {
    throw new AppError("Category is Already Exists", 400);
  }

  const category = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

export default categoryCreateService;
