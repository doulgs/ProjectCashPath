import { Tabs, Stack } from "expo-router";
import { View } from "react-native";

import { colors } from "@/styles/colors";
import {
  ArrowRightLeft,
  ChartNoAxesColumn,
  CircleUserRound,
  DiamondPlus,
  House,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <View className="flex-1 bg-zinc-800">
      <Stack
        initialRouteName="summary"
        screenOptions={{
          //tabBarShowLabel: false,
          /* tabBarStyle: {
            backgroundColor: colors.darkZinc[900],
            borderTopWidth: 0.5,
            borderTopColor: colors.darkZinc[500],
            height: 60,
          }, */
          //tabBarActiveTintColor: colors.primary[200],
          //tabBarInactiveTintColor: colors.darkZinc[300],
          headerStyle: {
            backgroundColor: colors.darkZinc[900],
            //borderBottomWidth: 0,
            //borderBottomColor: colors.darkZinc[500],
            //elevation: 0,
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
            //tabBarIcon: ({ color }) => <House size={24} color={color} />,
          }}
        />
        <Stack.Screen
          name="summary"
          options={{
            title: "",
            //tabBarIcon: ({ color }) => <ArrowRightLeft size={24} color={color} />,
          }}
        />
        <Stack.Screen
          name="[movimentsType]"
          options={{
            title: "Menu",
            headerShown: false,
            //tabBarIcon: ({ color }) => <DiamondPlus size={32} color={color} />,
            //tabBarStyle: { display: "none" },
          }}
          /* listeners={() => ({
            tabPress: (event) => {
              event.preventDefault();
              () => {};
            },
          })} */
        />
        <Stack.Screen
          name="charts"
          options={{
            title: "Graficos",
            //tabBarIcon: ({ color }) => <ChartNoAxesColumn size={24} color={color} />,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Perfil",
            headerShown: false,
            // tabBarIcon: ({ color }) => <CircleUserRound size={24} color={color} />,
          }}
        />
      </Stack>
    </View>
  );
}
