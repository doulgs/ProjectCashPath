type TypeUser = {
  id: number;
  name: string;
};

type TypeAccount = {
  id: number;
  name: string;
  image_url: string;
};

type TypeCategory = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

type TypeTransaction = {
  id: number;
  description: string;
  value: number;
  date: Date; // ISO date string
  transactionType: "EXPENSE" | "INCOME"; // Enum-like string literal types
  user: TypeUser;
  account: TypeAccount;
  category: TypeCategory;
};

type SectionTransaction = {
  title: string;
  data: TypeTransaction[];
};
