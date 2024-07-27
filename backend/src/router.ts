import { Router } from "express";

import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";
import { AuthCompanyController } from "./controllers/companies/AuthCompanyController";

const router = Router();

// Rotas para manipulação das empresas
router.post("/company/create", new CreateCompanyController().handle);
router.post("/company/session", new AuthCompanyController().handle);

export { router };
