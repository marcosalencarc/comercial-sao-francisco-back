import Category from "../../models/Category";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../../repositories/CategoryRepository";
import AppError from "../../errors/AppErro";


interface RequestDTO {
  id: string;
  name: string
}

class UpdateCategoryService {
  public async execute({ id, name }: RequestDTO): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const numberId = Number(id)

    const findCategory: Category | null = await categoryRepository.findById(
      numberId,
    );

    if (findCategory == null) {
      throw new AppError('Nenhuma categoria encontrada', 400);
    }


    const findCategorySomeName = await categoryRepository.findByName(
      name.toUpperCase(),
    );

    if (findCategorySomeName != null) {
      if (findCategorySomeName.length > 0) {
        throw new AppError('Uma categoria com esse nome já foi cadastrada', 400);
      }
    }

    findCategory.name = name.toUpperCase()


    return await categoryRepository.save(findCategory);
  }
}

export default UpdateCategoryService;
