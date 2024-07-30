import { Request, Response } from "express";
import { ListByMonthTransactionService } from "../../services/transactions/listByMonthTransactionService";

class ListByMonthTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const date = req.headers["date"]; // Supondo que o cabeçalho com a data

    if (!date) {
      return res.status(400).json({ error: "Date header is missing" });
    }

    const listByMonthTransactionService = new ListByMonthTransactionService();

    const transaction = await listByMonthTransactionService.execute({
      date: date as string,
      userId,
    });

    return res.json({ transaction });
  }
}

export { ListByMonthTransactionController };
