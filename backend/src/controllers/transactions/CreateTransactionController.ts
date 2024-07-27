import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transactions/CreateTransactionService";
import { TransactionType } from "../../types/databaseTypes";

class CreateTransactionController {
  async handle(req: Request<{}, {}, TransactionType>, res: Response) {
    const { description, value, date, transactionType, categoryId, accountId } = req.body;

    const userId = req.user_id;

    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      description,
      value,
      date,
      transactionType,
      categoryId,
      accountId,
      userId,
    });

    return res.json(transaction);
  }
}

export { CreateTransactionController };
