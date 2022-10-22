import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/ErrorHTTP";

const CategoriesPropService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categories = await categoryRepository.find();

  const category = categories.find((el) => el.id === id);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  return category;
};

export default CategoriesPropService;
