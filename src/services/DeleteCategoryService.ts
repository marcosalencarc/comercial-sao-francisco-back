
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppErro';
import CategoryRepository from '../repositories/CategoryRepository';

class DeleteCategoryService {
  public async execute(id: string): Promise<void> {
    const categoryiesRepository = getCustomRepository(CategoryRepository);

    const exsitTransaction = await categoryiesRepository.findOne({
      where: { id },
    });

    if (!exsitTransaction) throw new AppError('Essa categoria não existe');

    await categoryiesRepository.delete(id);
  }
}

export default DeleteCategoryService;