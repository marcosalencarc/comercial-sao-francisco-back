import { EntityRepository, Repository } from "typeorm";
import Provider from "../models/Providers";


@EntityRepository(Provider)
class ProviderRepository extends Repository<Provider>{
  public async findByCpfCnpj(cpfCnpj: String): Promise<Provider | null >{
    const findProvider = await this.findOne({
      where: {cpf_cnpj : cpfCnpj}
    }); 
    return findProvider || null;
  }
}

export default ProviderRepository;