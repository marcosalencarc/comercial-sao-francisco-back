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
  public async execute({fantasy_name, cpf_cnpj, company_name, category}: ProviderRequestDTO): Promise<Provider> {
    const providerRepository = getCustomRepository(ProviderRepository);

    const findProvider = await providerRepository.findByCpfCnpj(
      cpf_cnpj,
    );

    if (findProvider) {
      throw new AppError('Já existe um fornecedor cadastrado com esse CPF/CNPJ', 400);
    }

    const categoryPersist = await this.getCategory(category)

    const provider = providerRepository.create({
      fantasy_name,
      cpf_cnpj,
      company_name,
      category: categoryPersist
    })


    await providerRepository.save(provider);

    return provider;
  }

  private async getCategory({id, name}: DomainRequestDTO): Promise<Category>{
    const categoryRepository = getCustomRepository(CategoryRepository);
    const createCategoryService = new CreateCategoryService()

    if(id != undefined && id !=null){
      const findCategory = await categoryRepository.findById(id)
      if(findCategory) return findCategory;
    }

    if(!StringUtil.isNullOrEmpty(name)){
      const findCategory = await categoryRepository.findByExactName(name.toUpperCase())
      if(findCategory) return findCategory;
    }

    return createCategoryService.execute({name:name})

  }
}

export default CreateProviderService;
