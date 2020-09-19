import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppErro";
import Brand from "../../models/Brands";
import BrandRepository from "../../repositories/BrandRepository";


interface RequestDTO {
  id: string;
  name: string
}

class UpdateBrandService {
  public async execute({ id, name }: RequestDTO): Promise<Brand> {
    const brandRepository = getCustomRepository(BrandRepository);

    const numberId = Number(id)

    const findBrand: Brand | null = await brandRepository.findById(
      numberId,
    );

    if (findBrand == null) {
      throw new AppError('Nenhuma categoria encontrada', 400);
    }


    const findBrandSomeName = await brandRepository.findByName(
      name.toUpperCase(),
    );

    if (findBrandSomeName) {
        throw new AppError('Uma Marca com esse nome já foi cadastrada', 400);
    }

    findBrand.name = name.toUpperCase()


    return await brandRepository.save(findBrand);
  }
}

export default UpdateBrandService;
