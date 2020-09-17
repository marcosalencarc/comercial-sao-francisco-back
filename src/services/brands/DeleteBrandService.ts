
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppErro';
import BrandRepository from '../../repositories/BrandRepository';

class DeleteBrandService {
  public async execute(id: string): Promise<void> {
    const brandsRepository = getCustomRepository(BrandRepository);

    const exsitBrand = await brandsRepository.findById(Number(id));

    if (!exsitBrand) throw new AppError('Essa categoria não existe');

    await brandsRepository.delete(id);
  }
}

export default DeleteBrandService;