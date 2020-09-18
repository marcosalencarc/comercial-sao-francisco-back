import DomainRequestDTO from "./DomainRequestDTO";

interface ProviderRequestDTO {
  fantasy_name: string;
  cpf_cnpj: string;
  company_name: string;
  category: DomainRequestDTO;
}

export default ProviderRequestDTO;
