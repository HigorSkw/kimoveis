import AppDataSource from "../../data-source";
import { AppError } from "../../errors/ErrorHTTP";
import { IPropertyRequest, IProperty } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entity";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";

const propertyCreateService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const addresses = await addressRepository.find();
  const categories = await categoryRepository.find();

  const validadeAdresses = addresses.find(
    (el) =>
      el.city === address.city &&
      el.district === address.district &&
      el.state === address.state &&
      el.zipCode === address.zipCode
  );

  const findCategory = categories.find(
    (category) => category.id === categoryId
  );

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  if (validadeAdresses) {
    throw new AppError("Address already exists", 400);
  }

  if (address.state.length > 2) {
    throw new AppError("State max is 2 characteres", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("ZipCode max is 8 characteres", 400);
  }

  const salvandoEndereco = addressRepository.create({
    city: address.city,
    district: address.district,
    number: address.number,
    state: address.state,
    zipCode: address.zipCode,
  });

  await addressRepository.save(salvandoEndereco);

  const newProperty = propertyRepository.create({
    sold: false,
    address: salvandoEndereco,
    category: findCategory,
    size: size,
    value: value,
  });

  const propertyComplete = await propertyRepository.save(newProperty);

  return propertyComplete;
};

export default propertyCreateService;
