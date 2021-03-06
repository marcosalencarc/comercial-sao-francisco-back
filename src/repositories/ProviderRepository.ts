import { EntityRepository, Like, Raw, Repository } from "typeorm";
import Provider from "../models/Providers";


@EntityRepository(Provider)
class ProviderRepository extends Repository<Provider>{
  public async findByCpfCnpj(cpfCnpj: String): Promise<Provider | null >{
    const findProvider = await this.findOne({
      where: {cpf_cnpj : cpfCnpj, is_active:true}
    }); 
    return findProvider || null;
  }

  public async findById(id: string): Promise<Provider | null> {
    const findProvider = await this.findOne({
      where:[{id, is_active:true}],
      relations: ['category']
    });
    return findProvider || null;
  }

  public async findAll(): Promise<Provider[] | null> {
    const findProvider = await this.find({
      where : [{is_active:true}],
      relations: ['category']
    });
    return findProvider || null;
  }

  public async findByFantasyOrCompanyName(value: string): Promise<Provider[] | null> {
    const findProvider = await this.find({
      where : [
        {fantasy_name : Raw(alias => `${alias} ILIKE '%${value}%'`), is_active:true}, 
        {company_name : Raw(alias => `${alias} ILIKE '%${value}%'`), is_active:true}, 
      ],
      relations: ['category']
    });
    return findProvider || null;
  }
}

export default ProviderRepository;