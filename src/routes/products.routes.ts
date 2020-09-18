import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductRequestDTO from '../DTO/ProductRequestDTO';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/products/CreateProductService';

const productsRouter = Router();

productsRouter.post('/', async (request, response) => {
  const params: ProductRequestDTO = request.body
  const createProductService = new CreateProductService()
  const product = await createProductService.execute(params)
  return response.json(product);
});

productsRouter.get('/', async (request, response) => {
  const productRepository = getCustomRepository(ProductRepository);
  return response.json(await productRepository.findAll());
});

export default productsRouter;
