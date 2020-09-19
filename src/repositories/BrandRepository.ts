import { EntityRepository, Like, Repository } from "typeorm";
import Brand from "../models/Brands";


@EntityRepository(Brand)
class BrandRepository extends Repository<Brand>{
    public async findLikeName(name: string): Promise<Brand[] | null> {
        const findBrand = await this.find({
          where:[{
            name: Like(`%${name.toUpperCase()}%`)
          }]
        });
        return findBrand || null;
      }

      public async findByName(name: string): Promise<Brand | null> {
        const findBrand = await this.findOne({
          where:[{
            name
          }]
        });
        return findBrand || null;
      }

      public async findById(id: number): Promise<Brand | null> {
        const findBrand = await this.findOne({
          where:[{
            id
          }]
        });
        return findBrand || null;
      }
}

export default BrandRepository;