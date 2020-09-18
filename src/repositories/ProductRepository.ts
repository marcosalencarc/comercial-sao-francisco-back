import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findById(id: string): Promise<Product | null> {
    const findProduct = await this.findOne({
      where: { id },
    });
    return findProduct || null;
  }

  public async findAll(): Promise<Product[]| null>{
    const findProducts = await this.find({
      where: {is_active:true},
      relations: ['category', 'provider', 'brand']
    });
    return findProducts
  }
}

export default ProductRepository;
