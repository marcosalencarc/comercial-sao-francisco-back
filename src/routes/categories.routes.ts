import { request, response, Router} from "express";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../repositories/CategoryRepository";
import CreateCategoryService from "../services/CreateCategorySevice";
import DeleteCategoryService from "../services/DeleteCategoryService";
import UpdateCategoryService from "../services/UpdateCategoryService";

const categoriesRouter= Router()


// TODO: Fazer a documentação no código 

categoriesRouter.get('/', async (request, response) => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const name = request.query.name != undefined ? request.query.name.toString() : "";
  return name != "" ? response.json(await categoryRepository.findByName(name)) : response.json(await categoryRepository.find());
});


categoriesRouter.post('/', async (request,response) =>{
  const {name} = request.body

  const createCategoryService = new CreateCategoryService()

  const category = await createCategoryService.execute({name})

  return response.json(category)
});


categoriesRouter.delete('/:id', async (request, response)=>{
  const {id} = request.params;

  const deleteCategoryService = new DeleteCategoryService();

  await deleteCategoryService.execute(id);

  return response.status(204).send()
})

categoriesRouter.patch('/:id', async (request, response) => {
  const {id} = request.params

  const {name} = request.body

  const updateCategoryService = new UpdateCategoryService()

  const categoryUpdate = await updateCategoryService.execute({id,name})

  return response.json(categoryUpdate)


})



export default categoriesRouter;
