
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppErro';
import ProviderRepository from '../../repositories/ProviderRepository';

class DeleteProviderService {
  public async execute(id: string): Promise<void> {
    const providersRepository = getCustomRepository(ProviderRepository);

    const exsitProvider = await providersRepository.findOne({
      where: { id },
    });

    if (!exsitProvider) throw new AppError('Esse fornecedor não existe');

    await providersRepository.delete(id);
  }
}

export default DeleteProviderService;