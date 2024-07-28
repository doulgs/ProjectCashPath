import { Request, Response } from "express";
import { ListByMonthTransactionService } from "../../services/transactions/listByMonthTransactionService";

class ListByMonthTransactionController {
  async handle(req: Request, res: Response) {
    const { date } = req.body;

    const userId = req.user_id;

    const listByMonthTransactionService = new ListByMonthTransactionService();

    const transaction = await listByMonthTransactionService.execute({ date, userId });

    return res.json({ transaction });
  }
}

export { ListByMonthTransactionController };
