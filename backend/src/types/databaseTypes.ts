// Tipos de dados para o modelo de dados do Prisma
export type CompanyType = {
  id: number;
  name: string;
  taxId: string;
  email: string;
  password: string;
  users: UserType[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  companyId: number;
  company: CompanyType;
  isAdmin: boolean;
  transactions: TransactionType[];
  accounts: AccountType[];
  categories: CategoryType[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type CategoryType = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  userId: number;
  user: UserType;
  transactions: TransactionType[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

export enum ExpenseType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type TransactionType = {
  id: number;
  description: string;
  value: number;
  date: Date;
  transactionType: ExpenseType;
  categoryIdType: number;
  accountId: number;
  userId: number;
  category: CategoryType;
  account: AccountType;
  user: UserType;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type AccountType = {
  id: number;
  name: string;
  balance: number;
  userId: number;
  user: UserType;
  isPrivate: boolean;
  imageUrl?: string;
  transactions: TransactionType[];
  createdAt: Date | null;
  updatedAt: Date | null;
};
