import ProductRequestDTO from "../../DTO/ProductRequestDTO";
import Product from "../../models/Product";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../../repositories/ProductRepository";
import CategoryRepository from "../../repositories/CategoryRepository";
import AppError from "../../errors/AppErro";
import BrandRepository from "../../repositories/BrandRepository";
import ProviderRepository from "../../repositories/ProviderRepository";

class CreateProductService{
  public async execute(params: ProductRequestDTO): Promise<Product>{
    const productRepository = getCustomRepository(ProductRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);
    const brandRepository = getCustomRepository(BrandRepository);
    const providerRepository = getCustomRepository(ProviderRepository);

    const findCategory = await categoryRepository.findById(params.category.id);
    if(!findCategory)
      throw new AppError("Categoria não encontrada, tente novamente", 400)

    const findBrand = await brandRepository.findById(params.brand.id)
    if(!findBrand)
      throw new AppError("Marca não encontrada, tente novamente", 400)

    const findProvider = await providerRepository.findById(params.provider_id)
    if(!findProvider)
      throw new AppError("Fornecedor não encontrado, tente novamente", 400)

    const product = productRepository.create({
      name: params.name,
      description: params.description,
      reference: params.reference,
      min_inventory: params.min_inventory,
      max_inventory: params.max_inventory,
      current_inventory: params.current_inventory,
      weight: params.weight,
      markup: params.markup,
      cost: params.cost,
      wholesale: params.wholesale,
      retail: params.retail,
      note: params.note,
      product_img: params.product_img,
      category: findCategory,
      brand: findBrand,
      provider: findProvider
    })

    await productRepository.save(product)

    return product;
  }

}

export default CreateProductService;
