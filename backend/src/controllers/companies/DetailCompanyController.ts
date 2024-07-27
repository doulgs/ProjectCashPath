import { Request, Response } from "express";
import { CompanyType } from "../../types/databaseTypes";
import { DetailCompanyService } from "../../services/companies/DetailCompanyService";

class DetailCompanyController {
  async handle(req: Request<{}, {}, CompanyType>, res: Response) {
    const company_id = req.company_id;

    const detailCompanyService = new DetailCompanyService();

    const auth = await detailCompanyService.execute({ company_id });

    return res.json(auth);
  }
}

export { DetailCompanyController };
