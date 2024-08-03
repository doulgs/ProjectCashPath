import { API } from "../api";

export type AccountsProps = {
  id: number;
  name: string;
  balance: number;
  image_url: string;
  token: string;
  userId: number;
};

type CreateAccounts = Omit<AccountsProps, "id" | "userId">;

export function accountsService() {
  async function createAccounts({ name, balance, image_url, token }: CreateAccounts) {
    try {
      if (!token) {
        throw new Error(`invalid token | token is undefined`);
      }

      const { data } = await API.post(
        "user/account/create",
        {
          name,
          balance,
          image_url,
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

  async function getAllAccounts(token: string) {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    try {
      const { data } = await API.get<AccountsProps[]>(`/user/account/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching transaction details: ${err.message || err}`);
    }
  }

  return { createAccounts, getAllAccounts };
}
