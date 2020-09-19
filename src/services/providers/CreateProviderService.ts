import { getCustomRepository } from 'typeorm';
import Provider from '../../models/Providers';
import ProviderRepository from '../../repositories/ProviderRepository';
import CategoryRepository from '../../repositories/CategoryRepository';

import AppError from '../../errors/AppErro';
import CreateCategoryService from '../categories/CreateCategorySevice';
import Category from '../../models/Category';
import StringUtil from '../../util/string.util';
import ProviderRequestDTO from '../../DTO/ProviderRequestDTO';
import DomainRequestDTO from '../../DTO/DomainRequestDTO';

class CreateProviderService {
  public async execute({ fantasy_name, cpf_cnpj, company_name, category }: ProviderRequestDTO): Promise<Provider> {
    const providerRepository = getCustomRepository(ProviderRepository);

    const categoryRepository = getCustomRepository(CategoryRepository);

    const findCategory = await categoryRepository.findById(category.id)
    if (!findCategory)
      throw new AppError('Categoria não encontrada', 400);

    const findProvider = await providerRepository.findByCpfCnpj(
      cpf_cnpj,
    );

    if (findProvider) {
      throw new AppError('Já existe um fornecedor cadastrado com esse CPF/CNPJ', 400);
    }

    const provider = providerRepository.create({
      fantasy_name,
      cpf_cnpj,
      company_name,
      category: findCategory
    })


    await providerRepository.save(provider);

    return provider;
  }
}

export default CreateProviderService;
