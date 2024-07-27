import { Request, Response } from "express";
import { CompanyType } from "../../types/databaseTypes";
import { CreateCompanyService } from "../../services/companies/CreateCompanyService";

class CreateCompanyController {
  async handle(req: Request<{}, {}, CompanyType>, res: Response) {
    const { name, taxId, email, password } = req.body;

    const createCompanyService = new CreateCompanyService();

    const company = await createCompanyService.execute({ name, taxId, email, password });

    return res.json(company);
  }
}

export { CreateCompanyController };
