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

  @Column()
  name: string;

  @Column()
  description: string;

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
  reference: string;

  @Column()
  min_inventory: string;

  @Column()
  max_inventory: string;

  @Column()
  current_inventory: string;

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
  suggested_price: number;

  @Column()
  discount: number;

  @Column()
  commission: number;

  @Column()
  note: number;

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
