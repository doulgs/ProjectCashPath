import { API } from "../api";

export type CategoryProps = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  token: string;
  userId: number;
};

type CreateCategory = Omit<CategoryProps, "id" | "userId">;

export function categoriesService() {
  async function createCategory({ name, description, image_url, token }: CreateCategory) {
    try {
      if (!token) {
        throw new Error(`invalid token | token is undefined`);
      }

      const { data } = await API.post(
        "/user/category/create",
        {
          name,
          description,
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

  async function getAllCategory(token: string) {
    if (!token) {
      throw new Error(`invalid token | token is undefined`);
    }

    try {
      const { data } = await API.get<CategoryProps[]>(`/user/category/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(`Error fetching transaction details: ${err.message || err}`);
    }
  }

  return { createCategory, getAllCategory };
}
