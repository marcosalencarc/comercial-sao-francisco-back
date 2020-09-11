import { Router} from "express";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../repositories/CategoryRepository";
import CreateCategoryService from "../services/CreateCategorySevice";

const categoriesRouter= Router()

categoriesRouter.get('/', async (request, response) => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const name = request.query.name != undefined ? request.query.name.toString() : "";
  return name != "" ? response.json(await categoryRepository.findByName(name)) : response.json(await categoryRepository.find());
});

categoriesRouter.post('/', async (request,response) =>{
  const {name, description} = request.body

  const createCategoryService = new CreateCategoryService()

  const category = await createCategoryService.execute({name, description})

  return response.json(category)
});



export default categoriesRouter;
