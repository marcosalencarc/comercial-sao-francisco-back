import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductRequestDTO from '../DTO/ProductRequestDTO';
import ProductRepository from '../repositories/ProductRepository';

const productsRouter = Router();



productsRouter.post('/', async (request, response) => {
  const params: ProductRequestDTO = request.body
  console.log(params)
  const productRepository = getCustomRepository(ProductRepository);
  return response.json(await productRepository.find());
});

productsRouter.get('/:id', async (request, response) => {
  const {id} = request.params;
  const productRepository = getCustomRepository(ProductRepository);
  return response.json({"message": id});
});

export default productsRouter;
