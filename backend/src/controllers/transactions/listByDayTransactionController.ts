import { Request, Response } from "express";
import { ListByDayTransactionService } from "../../services/transactions/listByDayTransactionService";

class ListByDayTransactionController {
  async handle(req: Request, res: Response) {
    const { date } = req.body;

    const userId = req.user_id;

    const listByDayTransactionService = new ListByDayTransactionService();

    const transaction = await listByDayTransactionService.execute({ date, userId });

    return res.json({ transaction });
  }
}

export { ListByDayTransactionController };
