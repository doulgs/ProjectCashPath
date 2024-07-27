import { Request, Response } from "express";
import { UserType } from "../../types/databaseTypes";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(req: Request<{}, {}, UserType>, res: Response) {
    const { name, email, password } = req.body;

    const company_id = req.company_id;

    const createUserService = new CreateUserService();

    const company = await createUserService.execute({
      name,
      email,
      password,
      companyId: company_id,
    });

    return res.json(company);
  }
}

export { CreateUserController };
