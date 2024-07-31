import prismaClient from "../../prisma/index";
import { TransactionType, AccountType, CategoryType } from "../../types/databaseTypes";

// Define um tipo para os parâmetros esperados
type Transaction = Pick<TransactionType, "id" | "userId">;

class DetailTransactionService {
  async execute({ id, userId }: Transaction) {
    try {
      // Busca a transação pelo ID e userId
      const transaction = await prismaClient.transaction.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          account: true,
          category: true,
          user: true,
        },
      });

      // Verifica se a transação foi encontrada
      if (!transaction) {
        return [];
      }
      /*  if (!transaction) {
        return { error: "Transaction not found" };
      } */

      // Retorna os dados da transação, conta e categoria
      return {
        id: transaction.id,
        description: transaction.description,
        value: transaction.value,
        date: transaction.date,
        transactionType: transaction.transactionType,
        user: {
          id: transaction.user.id,
          name: transaction.user.name,
        },
        account: {
          id: transaction.account.id,
          name: transaction.account.name,
          image_url: transaction.account.image_url,
        },
        category: {
          id: transaction.category.id,
          name: transaction.category.name,
          description: transaction.category.description,
          image_url: transaction.category.image_url,
        },
      };
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      return { error: "Internal server error" };
    }
  }
}

export { DetailTransactionService };
