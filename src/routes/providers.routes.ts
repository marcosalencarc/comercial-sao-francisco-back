import { Router } from "express";
import { getCustomRepository } from "typeorm";
import Provider from "../models/Providers";
import ProviderRepository from "../repositories/ProviderRepository";
import CreateProviderService from "../services/CreateProviderService";


const providersRoutes = Router();

providersRoutes.get("/", async (request, response) => {
    const providerRepository = getCustomRepository(ProviderRepository)
    return response.json(await providerRepository.find())

})

providersRoutes.post('/', async (request, response) => {

    const { fantasy_name, cpf_cnpj, company_name, category_id } = request.body;
    const createProvider = new CreateProviderService();
    const provider = await createProvider.execute({ fantasy_name, cpf_cnpj, company_name, category_id });
    
    return response.json(provider)
});

export default providersRoutes;

