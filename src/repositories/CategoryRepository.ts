import { EntityRepository, Repository, Like } from 'typeorm';
import Category from '../models/Category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findByName(name: string): Promise<Category[] | null> {
    const findCategory = await this.find({
      where:[{
        name: Like(`%${name.toUpperCase()}%`)
      }]
    });
    return findCategory || null;
  }

  public async findById(id: string): Promise<Category | null> {
    const findCategory = await this.findOne({
      where:[{
        id
      }]
    });
    return findCategory || null;
  }
}

export default CategoryRepository;
