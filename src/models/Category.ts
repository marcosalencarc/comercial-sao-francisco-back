import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}

export default Category;
