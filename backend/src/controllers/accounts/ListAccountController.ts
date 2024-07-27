import { Request, Response } from "express";
import { ListAccountService } from "../../services/accounts/ListAccountService";

class ListAccountController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const listAccountService = new ListAccountService();

    const account = await listAccountService.execute({ userId });

    return res.json({ account });
  }
}

export { ListAccountController };
