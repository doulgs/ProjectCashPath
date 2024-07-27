import { Request, Response } from "express";
import { CompanyType } from "../../types/databaseTypes";
import { AuthCompanyService } from "../../services/companies/AuthCompanyService";

class AuthCompanyController {
  async handle(req: Request<{}, {}, CompanyType>, res: Response) {
    const { email, password } = req.body;

    const authCompanyService = new AuthCompanyService();

    const auth = await authCompanyService.execute({ email, password });

    return res.json(auth);
  }
}

export { AuthCompanyController };
