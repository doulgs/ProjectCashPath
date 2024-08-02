import { Tabs, Stack } from "expo-router";
import { View } from "react-native";

import { colors } from "@/styles/colors";

export default function TabLayout() {
  return (
    <View className="flex-1 bg-zinc-800">
      <Stack
        initialRouteName="summary"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.darkZinc[900],
          },
          headerTitleStyle: {
            fontWeight: "light",
            color: colors.zinc[200],
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Inicio",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="summary"
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="moviments"
          options={{
            title: "Menu",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="charts"
          options={{
            title: "Graficos",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Perfil",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
