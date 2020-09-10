import { Router } from "express";
import { getCustomRepository } from "typeorm";
import Provider from "../models/Providers";
import ProviderRepository from "../repositories/ProviderRepository";


const providersRoutes = Router();

providersRoutes.get("/:cpfCpnj", async (request, response)=>{
    const {cpfCnpj} = request.params

    const providerRepository = getCustomRepository(ProviderRepository)

})

// providersRoutes.post('/', async (request, response) => {
//     try {
//       const { name, email, password } = request.body;
//         //const createUser = new CreateUserService();
//       const user = await createUser.execute({ name, email, password });
//       delete user.password;
  
//       return response.json(user);
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   });

