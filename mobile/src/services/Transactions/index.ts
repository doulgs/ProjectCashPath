import dayjs from "dayjs";
import { API } from "../api";

export type CreateTransactionProps = {
  description: string;
  value: number;
  date: Date;
  transactionType: "INCOME" | "EXPENSE";
  categoryId: number;
  accountId: number;
  token: string;
};

export function transactionsService() {
  async function create({
    description,
    value,
    date,
    transactionType,
    categoryId,
    accountId,
    token,
  }: CreateTransactionProps) {
    try {
      if (!token) {
        throw new Error(`invalid token | token is undefined`);
      }

      const { data } = await API.post(
        "/user/transaction/create",
        {
          description,
          value,
          date,
          transactionType,
          categoryId,
          accountId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      throw err;
    }
  }

  async function detail(id: number, token: string) {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    try {
      const { data } = await API.get<TypeTransaction>(`/user/transaction/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
          idTransaction: id,
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching transaction details: ${err.message || err}`);
    }
  }

  async function listDay(date: Date, token: string) {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    const dateFormated = dayjs(date).format("YYYY-MM-DD");

    try {
      const { data } = await API.get<TypeTransaction[]>(`/user/transaction/listDay`, {
        headers: {
          Authorization: `Bearer ${token}`,
          date: dateFormated,
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching transaction details: ${err.message || err}`);
    }
  }

  async function listMonth(date: Date, token: string) {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    const dateFormated = dayjs(date).format("YYYY-MM-DD");

    try {
      //console.log(dateFormated, token);

      const { data } = await API.get<SectionTransaction[]>(
        `/user/transaction/listMonth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            date: dateFormated,
          },
        }
      );

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching transaction details: ${err.message || err}`);
    }
  }

  return { create, detail, listDay, listMonth };
}
