import { getCustomRepository } from 'typeorm';
import Provider from '../../models/Providers';
import ProviderRepository from '../../repositories/ProviderRepository';
import CategoryRepository from '../../repositories/CategoryRepository';

import AppError from '../../errors/AppErro';
import CreateCategoryService from '../categories/CreateCategorySevice';
import Category from '../../models/Category';
import StringUtil from '../../util/string.util';
import ArrayUtil from '../../util/array.util';

interface CategoryDTO{
  id: number,
  name: string
}

interface RequestDTO {
  fantasy_name: string;
  cpf_cnpj: string;
  company_name: string;
  category: CategoryDTO;
}

class CreateProviderService {
  public async execute({fantasy_name, cpf_cnpj, company_name, category}: RequestDTO): Promise<Provider> {
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

  private async getCategory({id, name}: CategoryDTO): Promise<Category>{
    const categoryRepository = getCustomRepository(CategoryRepository);
    const createCategoryService = new CreateCategoryService()
    
    if(id != undefined && id !=null){
      const findCategory = await categoryRepository.findById(id)
      if(findCategory) return findCategory;
    }

    if(!StringUtil.isNullOrEmpty(name)){
      const findCategory = await categoryRepository.findByName(name.toUpperCase())
      if(findCategory && !ArrayUtil.isNullOrEmpty(findCategory)) return findCategory[0];
    }

    return createCategoryService.execute({name:name})

  }
}

export default CreateProviderService;
