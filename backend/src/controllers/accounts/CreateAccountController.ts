import { Request, Response } from "express";
import { CreateAccountService } from "../../services/accounts/CreateAccountService";
import { AccountType } from "../../types/databaseTypes";

class CreateAccountController {
  async handle(req: Request<{}, {}, AccountType>, res: Response) {
    const { name, balance, image_url } = req.body;

    const userId = req.user_id;

    const createAccountService = new CreateAccountService();

    const account = await createAccountService.execute({
      name,
      balance,
      image_url,
      userId,
    });

    return res.json(account);
  }
}

export { CreateAccountController };
