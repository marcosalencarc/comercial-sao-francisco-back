import { getCustomRepository } from 'typeorm';
import Provider from '../models/Providers';
import ProviderRepository from '../repositories/ProviderRepository';
import CategoryRepository from '../repositories/CategoryRepository';

import AppError from '../errors/AppErro';

interface RequestDTO {
  fantasy_name: string;
  cpf_cnpj: string;
  company_name: string;
  category_id: string;
}

class CreateProviderService {
  public async execute({fantasy_name, cpf_cnpj, company_name,category_id}: RequestDTO): Promise<Provider> {
    const providerRepository = getCustomRepository(ProviderRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);

    const findProvider = await providerRepository.findByCpfCnpj(
      cpf_cnpj,
    );

    if (findProvider) {
      throw new AppError('This provider is already exists', 400);
    }

    const findCategory = await categoryRepository.findById(category_id)

    console.log(findCategory)

    if (!findCategory) {
      throw new AppError('This category isn\'t exists', 400);
    }

    const provider = providerRepository.create({
      fantasy_name,
      cpf_cnpj,
      company_name,
      category: findCategory
    })

    console.log(provider)
    await providerRepository.save(provider);

    return provider;
  }
}

export default CreateProviderService;
