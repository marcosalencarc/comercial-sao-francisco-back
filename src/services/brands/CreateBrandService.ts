import Brand from "../../models/Brands";
import { getCustomRepository } from "typeorm";
import BrandRepository from "../../repositories/BrandRepository";
import AppError from "../../errors/AppErro";


interface RequestDTO {
  name: string;
}

class CreateBrandService {
  public async execute({ name }: RequestDTO): Promise<Brand> {
    const brandRepository = getCustomRepository(BrandRepository);
    const nameUperCase = name.toUpperCase();

    const findBrandSomeName = await brandRepository.findByName(
      nameUperCase,
    );

    if (findBrandSomeName){ 
        throw new AppError('Uma marca com esse nome já foi cadastrada', 400);
    }

    const brand = brandRepository.create({
      name:nameUperCase,
    });
    
    await brandRepository.save(brand);

    return brand;
  }
}

export default CreateBrandService;
