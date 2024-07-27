import { Request, Response } from "express";
import { CompanyType } from "../../types/databaseTypes";
import { AuthUserService } from "../../services/users/AuthUserService";

class AuthUserController {
  async handle(req: Request<{}, {}, CompanyType>, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({ email, password });

    return res.json(auth);
  }
}

export { AuthUserController };
