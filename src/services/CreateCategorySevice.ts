import Category from "../models/Category";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../repositories/CategoryRepository";
import AppError from "../errors/AppErro";


interface RequestDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  public async execute({
    name,
    description,
  }: RequestDTO): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const nameUperCase = name.toUpperCase();

    const findCategorySomeName = await categoryRepository.findByName(
      nameUperCase,
    );

    if (findCategorySomeName != null) {
      if (findCategorySomeName.length > 0) {
        throw new AppError('This category is already exists', 400);
      }
    }

    const category = await categoryRepository.create({
      name: nameUperCase,
      description
    });
    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
