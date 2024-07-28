import { Request, Response } from "express";
import { DetailTransactionService } from "../../services/transactions/DetailTransactionService";
import { TransactionType } from "../../types/databaseTypes";

class DetailTransactionController {
  async handle(req: Request<{}, {}, TransactionType>, res: Response) {
    const { id } = req.body;

    const userId = req.user_id;

    const detailTransactionService = new DetailTransactionService();

    const transaction = await detailTransactionService.execute({ id, userId });

    return res.json({ transaction });
  }
}

export { DetailTransactionController };
