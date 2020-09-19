
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppErro';
import ProviderRepository from '../../repositories/ProviderRepository';

class DeleteProviderService {
  public async execute(id: string): Promise<void> {
    const providersRepository = getCustomRepository(ProviderRepository);

    const findProvider = await providersRepository.findOne({
      where: { id },
    });

    if (!findProvider) throw new AppError('Esse fornecedor não existe');

    findProvider.is_active = false

    await providersRepository.save(findProvider);
  }
}

export default DeleteProviderService;