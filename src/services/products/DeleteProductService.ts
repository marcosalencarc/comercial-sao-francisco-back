
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppErro';
import ProductRepository from '../../repositories/ProductRepository';
import { isUuid } from 'uuidv4';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    if (!isUuid(id)) throw new AppError('ID é invalido', 400);

    const findProduct = await productsRepository.findOne({
      where: { id },
    });

    if (!findProduct) throw new AppError('Esse produto não existe', 400);

    findProduct.is_active = false

    await productsRepository.save(findProduct);
  }
}

export default DeleteProductService;
