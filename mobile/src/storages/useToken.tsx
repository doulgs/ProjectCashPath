import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "CASH_PATH_TOKEN";

export function useToken() {
  const saveToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      return storedToken;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  return { saveToken, getToken, removeToken };
}
