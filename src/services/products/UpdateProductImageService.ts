import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppErro";
import path from 'path'
import ProductRepository from "../../repositories/ProductRepository";
import upload from "../../config/upload";
import fs from 'fs';
import Product from "../../models/Product";

interface Request{
    product_id: string;
    product_file_name: string
}

class UpdateProductImageService{
    public async execute({product_id, product_file_name}: Request) : Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findById(product_id)

        if(!product){
            throw new AppError('Erro ao atualizar a imagem. Produto não encotrado')
        }

        if(product.product_img){
            const productImgFilePath = path.join(upload.directory, product.product_img)
            const productImgFileExists = await fs.existsSync(productImgFilePath)

            if(productImgFileExists){
                await fs.promises.unlink(productImgFilePath)
            }
        }

        product.product_img = product_file_name

        await productRepository.save(product)

        return product;
    }
}

export default UpdateProductImageService;