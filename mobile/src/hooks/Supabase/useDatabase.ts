import { create } from "zustand";
import { supabase } from "@/services/Supabase";
import { ToastAndroid } from "react-native";
import { User, Category, Account, Transaction } from "@/types/database";

interface AppState {
  user: User;
  users: User[];
  categories: Category[];
  accounts: Account[];
  transactions: Transaction[];
  loading: boolean;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  setUser: (user: User) => Promise<void>;
  resetUser: () => void;
  fetchUsers: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchAccounts: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const initialState = {
  user: undefined as unknown as User,
  users: [],
  categories: [],
  accounts: [],
  transactions: [],
  loading: false,
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
};

const useDatabase = create<AppState>((set, get) => ({
  ...initialState,

  setUser: async (user: User) => {
    set({ loading: true });
    try {
      set({ user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  resetUser: () => {
    set({ user: initialState.user });
  },

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw new Error(error.message);
      set({ users: data || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw new Error(error.message);
      set({ categories: data || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchAccounts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("accounts").select("*");
      if (error) throw new Error(error.message);
      set({ accounts: data || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("transactions").select(`
        *,
        categories (id,image_url,name),
        accounts (id,image_url,name),
        users (id,is_admin,name)
      `);

      if (error) throw new Error(error.message);

      const income = data.reduce((acc, transaction) => {
        if (transaction.type === "income") return acc + transaction.amount;
        return acc;
      }, 0);

      const expense = data.reduce((acc, transaction) => {
        if (transaction.type === "expense") return acc + transaction.amount;
        return acc;
      }, 0);

      set({
        transactions: data || [],
        totalIncome: income,
        totalExpenses: expense,
        totalBalance: income - expense,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction: Omit<Transaction, "id">) => {
    try {
      const { data, error } = await supabase.from("transactions").insert([transaction]);
      if (error) throw new Error(error.message);
      ToastAndroid.show("Transação Adicionada", ToastAndroid.SHORT);
      await get().fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  },

  updateTransaction: async (id: string, updates: Partial<Transaction>) => {
    try {
      const { error } = await supabase.from("transactions").update(updates).match({ id });
      if (error) throw new Error(error.message);
      ToastAndroid.show("Transação atualizada", ToastAndroid.SHORT);
      await get().fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  },

  deleteTransaction: async (id: string) => {
    try {
      const { error } = await supabase.from("transactions").delete().match({ id });
      if (error) throw new Error(error.message);
      ToastAndroid.show("Transação deletada", ToastAndroid.SHORT);
      await get().fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  },
}));

export { useDatabase };
