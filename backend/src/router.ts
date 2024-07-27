import { Router } from "express";

// Middleware para verificação de autenticidade da empresa
import { isCompanyAuth } from "./middlewares/isCompanyAuth";
// Middleware para verificação de autenticidade do usuario
import { isUserAuth } from "./middlewares/isUserAuth";

import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";
import { AuthCompanyController } from "./controllers/companies/AuthCompanyController";
import { DetailCompanyController } from "./controllers/companies/DetailCompanyController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { ListCategoryController } from "./controllers/categories/ListCategoryController";
import { CreateAccountController } from "./controllers/accounts/CreateAccountController";
import { ListAccountController } from "./controllers/accounts/ListAccountController";
import { CreateTransactionController } from "./controllers/transactions/CreateTransactionController";

const router = Router();

// Rotas para manipulação das empresas
router.post("/company/create", new CreateCompanyController().handle);
router.post("/company/session", new AuthCompanyController().handle);
router.get("/company/me", isCompanyAuth, new DetailCompanyController().handle);

// Rotas para manipulação dos usuarios
router.post("/user/create", isCompanyAuth, new CreateUserController().handle);
router.post("/user/session", new AuthUserController().handle);
router.get("/user/me", isUserAuth, new DetailUserController().handle);

// Rotas para manipulação das categorias
router.post("/user/category/create", isUserAuth, new CreateCategoryController().handle);
router.get("/user/category/list", isUserAuth, new ListCategoryController().handle);

// Rotas para manipulação das contas
router.post("/user/account/create", isUserAuth, new CreateAccountController().handle);
router.get("/user/account/list", isUserAuth, new ListAccountController().handle);

// Rotas para manipulação das transacoes
router.post(
  "/user/transaction/create",
  isUserAuth,
  new CreateTransactionController().handle
);

export { router };
