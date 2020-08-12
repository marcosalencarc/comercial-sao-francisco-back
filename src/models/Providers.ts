import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Categories';

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

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  provider: Category;
}

export default Provider;
