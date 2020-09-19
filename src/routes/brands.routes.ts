

import {Router} from "express";
import { getCustomRepository } from "typeorm";
import BrandRepository from "../repositories/BrandRepository";
import CreateBrandService from "../services/brands/CreateBrandService";
import DeleteBrandService from "../services/brands/DeleteBrandService";
import UpdateBrandService from "../services/brands/UpdateBrandService";

const brandsRouter= Router()


// TODO: Fazer a documentação no código 

brandsRouter.get('/', async (request, response) => {
  const brandRepository = getCustomRepository(BrandRepository);
  const name = request.query.name != undefined ? request.query.name.toString() : "";
  return name != "" ? response.json(await brandRepository.findByName(name)) : response.json(await brandRepository.find());
});


brandsRouter.post('/', async (request,response) =>{
  const {name} = request.body

  const createBrandService = new CreateBrandService()

  const brand = await createBrandService.execute({name})

  return response.json(brand)
});


brandsRouter.delete('/:id', async (request, response)=>{
  const {id} = request.params;

  const deleteBrandService = new DeleteBrandService();

  await deleteBrandService.execute(id);

  return response.status(204).send()
})

brandsRouter.patch('/:id', async (request, response) => {
  const {id} = request.params

  const {name} = request.body

  const updateBrandService = new UpdateBrandService()

  const brandUpdate = await updateBrandService.execute({id,name})

  return response.json(brandUpdate)


})



export default brandsRouter;
