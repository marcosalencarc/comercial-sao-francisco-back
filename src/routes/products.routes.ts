import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductRequestDTO from '../DTO/ProductRequestDTO';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/products/CreateProductService';
import UpdateProductService from '../services/products/UpdateProductService';
import DeleteProductService from '../services/products/DeleteProductService';

const productsRouter = Router();


productsRouter.get('/', async (request, response) => {
  const {name} = request.query
  const productRepository = getCustomRepository(ProductRepository);
  if(name) return response.json(await productRepository.findByName(name as string))
  return response.json(await productRepository.findAll());
});

productsRouter.post('/', async (request, response) => {
  const params: ProductRequestDTO = request.body
  const createProductService = new CreateProductService()
  const product = await createProductService.execute(params)
  return response.json(product);
});

productsRouter.patch('/:id', async (request, response) => {
  const {id} = request.params
  const params: ProductRequestDTO = request.body
  const updateProductService = new UpdateProductService()
  const product = await updateProductService.execute(id,params)
  return response.json(product);
});

productsRouter.delete('/:id', async (request, response) =>{
  const {id} = request.params
  const deleteProductService = new DeleteProductService()
  await deleteProductService.execute(id)
  return response.status(204).send()
});

export default productsRouter;
