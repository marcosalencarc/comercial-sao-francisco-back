import Category from "../../models/Category";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../../repositories/CategoryRepository";
import AppError from "../../errors/AppErro";
import StringUtil from "../../util/string.util";
import ArrayUtil from "../../util/array.util";
import CreateCategoryService from "../categories/CreateCategorySevice";
import ProviderRepository from "../../repositories/ProviderRepository";
import { isUuid } from "uuidv4";
import Provider from "../../models/Providers";


interface CategoryDTO {
    id: number,
    name: string
}

interface RequestDTO {
    id: string;
    fantasy_name: string;
    cpf_cnpj: string;
    company_name: string;
    category: CategoryDTO;
}

class UpdateProviderService {
    public async execute({id,fantasy_name, cpf_cnpj, company_name, category}: RequestDTO): Promise<Provider> {
        const providerRepository = getCustomRepository(ProviderRepository);

        if (!isUuid(id)) throw new AppError('ID é invalido', 400);
        
        const findProvider = await providerRepository.findById(id);

        if(!findProvider){
            throw new AppError("Fornecedor não encontrado", 400)
        }
        
        const findProviderWithSameCpfCnpj = await providerRepository.findByCpfCnpj(cpf_cnpj);
        
        if(findProviderWithSameCpfCnpj && findProviderWithSameCpfCnpj.cpf_cnpj != cpf_cnpj){
            throw new AppError("Já existe um fornecedor com o mesmo CPF/CNPJ cadastrado", 400)
        }

        const categoryPersist = await this.updateCategory(category.name);


        findProvider.category = categoryPersist 
        findProvider.fantasy_name = fantasy_name;
        findProvider.cpf_cnpj = cpf_cnpj;
        findProvider.company_name = company_name;

        return providerRepository.save(findProvider)

    }

    public async updateCategory(name: string): Promise<Category>{
        const categoryRepository = getCustomRepository(CategoryRepository);

        if(!StringUtil.isNullOrEmpty(name)){
            const findCategory = await categoryRepository.findByName(name.toUpperCase())
            if(findCategory && !ArrayUtil.isNullOrEmpty(findCategory)) return findCategory[0];
            else{
                const createCategoryService = new CreateCategoryService()
                return await createCategoryService.execute({name})
            }
        } else {
            throw new AppError('O nome da categoria está inválido', 400);
        }
    }
}

export default UpdateProviderService;
