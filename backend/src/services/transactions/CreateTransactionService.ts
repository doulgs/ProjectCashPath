import prismaClient from "../../prisma/index";
import { TransactionType } from "../../types/databaseTypes";

type Transaction = Pick<
  TransactionType,
  | "description"
  | "value"
  | "date"
  | "transactionType"
  | "categoryId"
  | "accountId"
  | "userId"
>;

class CreateTransactionService {
  async execute({
    description,
    value,
    date,
    transactionType,
    categoryId,
    accountId,
    userId,
  }: Transaction) {
    try {
      const transaction = await prismaClient.transaction.create({
        data: {
          description,
          value,
          date,
          transactionType,
          categoryId,
          accountId,
          userId,
        },
        select: {
          description: true,
          value: true,
          date: true,
          transactionType: true,
          categoryId: true,
          accountId: true,
          userId: true,
        },
      });

      return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }
}

export { CreateTransactionService };
