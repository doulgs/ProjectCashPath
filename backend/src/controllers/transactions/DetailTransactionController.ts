import { Request, Response } from "express";
import { DetailTransactionService } from "../../services/transactions/DetailTransactionService";
import { TransactionType } from "../../types/databaseTypes";

class DetailTransactionController {
  async handle(req: Request<{}, {}, TransactionType>, res: Response) {
    const userId = req.user_id;

    const idTransaction = req.headers["id-transaction"]; // Supondo que o cabeçalho com a data

    console.log(idTransaction);

    if (!idTransaction) {
      return res.status(400).json({ error: "idTransaction header is missing" });
    }

    const id = Number(idTransaction);

    const detailTransactionService = new DetailTransactionService();

    const transaction = await detailTransactionService.execute({ id, userId });

    return res.json({ transaction });
  }
}

export { DetailTransactionController };
