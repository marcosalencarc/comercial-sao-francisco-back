import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';
import Provider from './Providers';
import Brand from './Brands';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Provider, {cascade: ["update", "remove"]})
  @JoinColumn({ name: 'provider_id'})
  provider: Provider;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  reference: string;

  @Column()
  min_inventory: number;

  @Column()
  max_inventory: number;

  @Column()
  current_inventory: number;

  @Column()
  weight: number;

  @Column()
  markup: number;

  @Column()
  cost: number;

  @Column()
  wholesale: number;

  @Column()
  retail: number;

  @Column()
  commission: number;

  @Column()
  note: string;

  @Column()
  product_img: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Product;
