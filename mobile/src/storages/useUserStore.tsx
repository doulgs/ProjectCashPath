import { SessionProps, UserProps, usersService } from "@/services/Users/userService";
import { router } from "expo-router";
import { create } from "zustand";
import { useToken } from "./useToken";

// Definindo o tipo do estado da nossa store
type UserState = {
  user: UserProps | null;
  loading: boolean;
  error: string | null;
  validateSignIn: (credentials: SessionProps) => Promise<void>;
  getUserDetails: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Criando a store com Zustand
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // Função para validar login
  validateSignIn: async (credentials: SessionProps) => {
    set({ loading: true, error: null });
    try {
      const userData = await usersService().validateSignIn(credentials);
      set({ user: userData, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Erro ao fazer login", loading: false });
    }
  },

  // Função para obter detalhes do usuário
  getUserDetails: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const userData = await usersService().getUserDetails(token);
      set({ user: userData, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Erro ao buscar detalhes do usuário", loading: false });
    }
  },

  // Função para logout
  logout: async () => {
    set({ user: null, error: null });
    await useToken().removeToken();
    router.navigate("/");
  },
}));
