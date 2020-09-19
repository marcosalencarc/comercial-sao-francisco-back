import ProductRequestDTO from "../../DTO/ProductRequestDTO";
import Product from "../../models/Product";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../../repositories/ProductRepository";
import CategoryRepository from "../../repositories/CategoryRepository";
import AppError from "../../errors/AppErro";
import BrandRepository from "../../repositories/BrandRepository";
import ProviderRepository from "../../repositories/ProviderRepository";
import { isUuid } from "uuidv4";

class UpdateProductService {
  public async execute(id: string, params: ProductRequestDTO): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);
    const brandRepository = getCustomRepository(BrandRepository);
    const providerRepository = getCustomRepository(ProviderRepository);

    if (!isUuid(id)) throw new AppError('ID é invalido', 400);

    const findProduct = await productRepository.findById(id)
    if (!findProduct)
      throw new AppError("Produto não encontrado, tente novamente")

    const findCategory = await categoryRepository.findById(params.category.id);
    if (!findCategory)
      throw new AppError("Categoria não encontrada, tente novamente", 400)

    const findBrand = await brandRepository.findById(params.brand.id)
    if (!findBrand)
      throw new AppError("Marca não encontrada, tente novamente", 400)

    const findProvider = await providerRepository.findById(params.provider_id)
    if (!findProvider)
      throw new AppError("Fornecedor não encontrado, tente novamente", 400)


    findProduct.name = params.name;
    findProduct.description = params.description;
    findProduct.reference = params.reference;
    findProduct.min_inventory = params.min_inventory;
    findProduct.max_inventory = params.max_inventory;
    findProduct.current_inventory = params.current_inventory;
    findProduct.weight = params.weight;
    findProduct.markup = params.markup;
    findProduct.cost = params.cost;
    findProduct.wholesale = params.wholesale;
    findProduct.retail = params.retail;
    findProduct.note = params.note;
    findProduct.product_img = params.product_img;
    findProduct.category = findCategory;
    findProduct.brand = findBrand;
    findProduct.provider = findProvider;
    findProduct.updated_at = new Date()


    await productRepository.save(findProduct)

    return findProduct;
  }

}

export default UpdateProductService;
