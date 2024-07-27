import { Router } from "express";

import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";

const router = Router();

// Rotas para manipulação das empresas
router.post("/company", new CreateCompanyController().handle);

export { router };
