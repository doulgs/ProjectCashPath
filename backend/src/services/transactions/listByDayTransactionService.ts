import prismaClient from "../../prisma/index";
import { TransactionType, AccountType, CategoryType } from "../../types/databaseTypes";

// Define um tipo para os parâmetros esperados
type TransactionsByDateParams = {
  date: string; // Vamos receber a data como string no formato 'YYYY-MM-DD'
  userId: number;
};

class ListByDayTransactionService {
  async execute({ date, userId }: TransactionsByDateParams) {
    try {
      // Converte a string de data para um objeto Date
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      // Busca todas as transações na data especificada
      const transactions = await prismaClient.transaction.findMany({
        where: {
          userId, // Adiciona o filtro pelo ID do usuário
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        include: {
          account: true,
          category: true,
          user: true,
        },
      });

      // Verifica se foram encontradas transações
      if (transactions.length === 0) {
        return [];
      }
      /* if (transactions.length === 0) {
        return { error: "No transactions found for the specified date" };
      } */

      // Ordena as transações pela data em ordem decrescente (mais recente primeiro)
      transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

      // Agrupa as transações pela data
      const groupedTransactions = transactions.reduce((acc, transaction) => {
        const date = transaction.date.toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push({
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
        });

        return acc;
      }, {} as Record<string, any[]>);

      // Formata a resposta no formato desejado
      const formattedResponse = Object.entries(groupedTransactions).map(
        ([title, data]) => ({
          title,
          data,
        })
      );

      return formattedResponse;
    } catch (error) {
      console.error("Error fetching transactions by date:", error);
      return { error: "Internal server error" };
    }
  }
}

export { ListByDayTransactionService };
