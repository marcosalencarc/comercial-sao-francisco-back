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
        const categoryRepository = getCustomRepository(CategoryRepository);
        if (!isUuid(id)) throw new AppError('ID é invalido', 400);

        const findProvider = await providerRepository.findById(id);

        if(!findProvider){
            throw new AppError("Fornecedor não encontrado", 400)
        }

        const findProviderWithSameCpfCnpj = await providerRepository.findByCpfCnpj(cpf_cnpj);

        if(findProviderWithSameCpfCnpj && findProviderWithSameCpfCnpj.cpf_cnpj != cpf_cnpj){
            throw new AppError("Já existe um fornecedor com o mesmo CPF/CNPJ cadastrado", 400)
        }

        const categoryPersist = await categoryRepository.findById(category.id)
        if(!categoryPersist)
          throw new AppError("Categoria não encontrada", 400)

        findProvider.category = categoryPersist
        findProvider.fantasy_name = fantasy_name;
        findProvider.cpf_cnpj = cpf_cnpj;
        findProvider.company_name = company_name;

        return providerRepository.save(findProvider)

    }

}

export default UpdateProviderService;
