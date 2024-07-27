import { Router } from "express";

import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";
import { AuthCompanyController } from "./controllers/companies/AuthCompanyController";
import { DetailCompanyController } from "./controllers/companies/DetailCompanyController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Middleware para verificação de autenticidade da empresa
import { isCompanyAuth } from "./middlewares/isCompanyAuth";
import { isUserAuth } from "./middlewares/isUserAuth";

const router = Router();

// Rotas para manipulação das empresas
router.post("/company/create", new CreateCompanyController().handle);
router.post("/company/session", new AuthCompanyController().handle);
router.get("/company/me", isCompanyAuth, new DetailCompanyController().handle);

// Rotas para manipulação dos usuarios
router.post("/user/create", isCompanyAuth, new CreateUserController().handle);
router.post("/user/session", new AuthUserController().handle);
router.get("/user/me", isUserAuth, new DetailUserController().handle);

export { router };
