import { API } from "../api";

export type SessionProps = {
  login: string;
  password: string;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export function usersService() {
  async function validateSignIn({ login, password }: SessionProps): Promise<UserProps> {
    if (!login || !password) {
      throw new Error(`Login e senha são necessários.`);
    }

    try {
      const { data } = await API.post<UserProps>("/user/session", {
        login,
        password,
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async function getUserDetails(token: string): Promise<UserProps> {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    try {
      const { data } = await API.get<UserProps>("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching user details: ${err.message || err}`);
    }
  }

  return { validateSignIn, getUserDetails };
}
