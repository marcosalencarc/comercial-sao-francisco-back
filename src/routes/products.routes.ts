import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductRequestDTO from '../DTO/ProductRequestDTO';
import ProductRepository from '../repositories/ProductRepository';
import multer from 'multer';
import uploadConfig from '../config/upload';

const productsRouter = Router();

const upload = multer(uploadConfig);


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

productsRouter.patch('/picture', upload.single('product_img'), async (request, response) =>{
  return response.json({ok: true})
})

export default productsRouter;
