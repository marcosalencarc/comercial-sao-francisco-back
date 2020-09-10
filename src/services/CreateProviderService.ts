import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Provider from '../models/Providers';
import ProviderRepository from '../repositories/ProviderRepository';

import AppError from '../errors/AppErro';

interface RequestDTO {
  category_id: string;
  fantasy_name: string;
  cpf_cnpj: string;
  company_name: string;
}

class CreateAppointmentService {
  public async execute({category_id,fantasy_name,cpf_cnpj,company_name
  }: RequestDTO): Promise<Provider> {
    const providerRepository = getCustomRepository(ProviderRepository);

    const findProvider = await providerRepository.findByCpfCnpj(
      cpf_cnpj,
    );

    if (findProvider) {
      throw new AppError('This provider is already exists', 400);
    }
    // TODO: Implementar restante
    // const appointment = providerRepository.create({
    //   provider_id,
    //   date: appointmentDate,
    // });

    // await appointmentRepository.save(appointment);
    return new Provider();
  }
}

export default CreateAppointmentService;
