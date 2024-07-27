export type User = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  is_private: boolean;
  admin_id: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
};

export type Transaction = {
  account_id: string;
  amount: number;
  category_id: string;
  created_at: Date;
  date: Date;
  description: string;
  id: string;
  title: string;
  type: string;
  updated_at: Date;
  user_id: string;
  user_name: string;
  users: {
    id: string;
    name: string;
    is_admin: boolean;
  };
  accounts: {
    id: string;
    image_url: string;
    name: string;
  };
  categories: {
    id: string;
    image_url: string;
    name: string;
  };
};
