import { Request, Response } from "express";
import { ListByDayTransactionService } from "../../services/transactions/listByDayTransactionService";

class ListByDayTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const date = req.headers["date"]; // Supondo que o cabeçalho com a data

    if (!date) {
      return res.status(400).json({ error: "Date header is missing" });
    }

    const listByDayTransactionService = new ListByDayTransactionService();

    const transaction = await listByDayTransactionService.execute({
      date: date as string,
      userId,
    });

    return res.json({ transaction });
  }
}

export { ListByDayTransactionController };
