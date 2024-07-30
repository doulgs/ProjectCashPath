import prismaClient from "../../prisma/index";
import { TransactionType, AccountType, CategoryType } from "../../types/databaseTypes";

// Define um tipo para os parâmetros esperados
type TransactionsByMonthParams = {
  date: string; // Vamos receber a data como string no formato 'YYYY-MM-DD'
  userId: number; // ID do usuário para filtrar as transações
};

class ListByMonthTransactionService {
  async execute({ date, userId }: TransactionsByMonthParams) {
    try {
      // Verifica se a data fornecida está no formato correto
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { error: "Invalid date format. Expected format is 'YYYY-MM-DD'" };
      }

      // Converte a string de data para um objeto Date
      const providedDate = new Date(date);

      // Verifica se a data fornecida é válida
      if (isNaN(providedDate.getTime())) {
        return { error: "Invalid date provided" };
      }

      // Define o primeiro dia do mês da data fornecida
      const startDate = new Date(
        Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth(), 1)
      );

      // Define o último dia do mês da data fornecida
      const endDate = new Date(
        Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth() + 1, 1)
      );

      // Busca todas as transações no mês especificado e do usuário especificado
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
        return { error: "No transactions found for the specified month and user" };
      }

      // Formata a resposta com os dados das transações
      return transactions.map((transaction) => ({
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
      }));
    } catch (error) {
      console.error("Error fetching transactions by month and user:", error);
      return { error: "Error fetching transactions by month" };
    }
  }
}

export { ListByMonthTransactionService };
