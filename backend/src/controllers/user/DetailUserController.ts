import { Request, Response } from "express";
import { CompanyType } from "../../types/databaseTypes";
import { DetailUserService } from "../../services/users/DetailUserService";

class DetailUserController {
  async handle(req: Request<{}, {}, CompanyType>, res: Response) {
    const userId = req.user_id;

    const detailUserService = new DetailUserService();

    const auth = await detailUserService.execute({ userId });

    return res.json(auth);
  }
}

export { DetailUserController };
