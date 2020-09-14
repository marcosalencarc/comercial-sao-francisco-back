import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fantasy_name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  company_name: string;

  @Column()
  is_active: boolean

  @ManyToOne(() => Category, {cascade: ["update", "remove"]})
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

export default Provider;
