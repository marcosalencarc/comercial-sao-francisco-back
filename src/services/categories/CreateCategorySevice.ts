import Category from "../../models/Category";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../../repositories/CategoryRepository";
import AppError from "../../errors/AppErro";


interface RequestDTO {
  name: string;
}

class CreateCategoryService {
  public async execute({
    name
  }: RequestDTO): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const nameUperCase = name.toUpperCase();

    const findCategorySomeName = await categoryRepository.findByExactName(
      nameUperCase,
    );

    if (findCategorySomeName) {
        throw new AppError('Uma categoria com esse nome já foi cadastrada', 400);
    }

    const category = categoryRepository.create({
      name:nameUperCase,
    });
    
    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
