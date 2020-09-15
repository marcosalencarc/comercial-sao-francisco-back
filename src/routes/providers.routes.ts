import { Router } from "express";
import { getCustomRepository } from "typeorm";
import ProviderRepository from "../repositories/ProviderRepository";
import CreateProviderService from "../services/providers/CreateProviderService";
import DeleteProviderService from "../services/providers/DeleteProviderService";
import UpdateProviderService from "../services/providers/UpdateProviderService";


const providersRoutes = Router();

providersRoutes.get("/", async (request, response) => {
    const providerRepository = getCustomRepository(ProviderRepository)
    
    const {name} = request.query
    if(name) return response.json(await providerRepository.findByFantasyOrCompanyName(name as string))
    
    return response.json(await providerRepository.find())

})

providersRoutes.post('/', async (request, response) => {

    const { fantasy_name, cpf_cnpj, company_name, category} = request.body;
    const createProvider = new CreateProviderService();
    const provider = await createProvider.execute({ fantasy_name, cpf_cnpj, company_name, category});
    
    return response.json(provider)
});

providersRoutes.patch('/:id', async (request, response) => {
    const {id} = request.params
  
    const { fantasy_name, cpf_cnpj, company_name, category} = request.body
  
    const updateProviderService = new UpdateProviderService()
  
    const providerUpdate = await updateProviderService.execute({id, fantasy_name, cpf_cnpj, company_name, category})
  
    return response.json(providerUpdate)
  
  
  })

  providersRoutes.delete('/:id', async (request, response)=>{
    const {id} = request.params;
  
    const deleteProviderService = new DeleteProviderService();
  
    await deleteProviderService.execute(id);
  
    return response.status(204).send()
  })

export default providersRoutes;

