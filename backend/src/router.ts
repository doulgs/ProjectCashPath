import { Router } from "express";

import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";
import { AuthCompanyController } from "./controllers/companies/AuthCompanyController";
import { DetailCompanyController } from "./controllers/companies/DetailCompanyController";

// Middleware para verificação de autenticidade da empresa
import { isCompanyAuth } from "./middlewares/isCompanyAuth";

const router = Router();

// Rotas para manipulação das empresas
router.post("/company/create", new CreateCompanyController().handle);
router.post("/company/session", new AuthCompanyController().handle);
router.get("/company/me", isCompanyAuth, new DetailCompanyController().handle);

export { router };
