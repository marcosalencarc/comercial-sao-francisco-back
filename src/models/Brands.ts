import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
class Brand {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;
}

export default Brand;
