import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { BadgePlus, Boxes, CreditCard, LayoutGrid, Wallet } from "lucide-react-native";
import { ReactNode, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

type ActionProps = {
  id: number;
  title: string;
  icon: () => ReactNode;
  action: () => void;
};

const listAction: ActionProps[] = [
  {
    id: 1,
    title: "Inserir Movimentação",
    icon: () => <BadgePlus color={colors.zinc[200]} size={28} />,
    action: () => router.push("/stacks/moviments"),
  },
  {
    id: 2,
    title: "listar Contas",
    icon: () => <Wallet color={colors.zinc[200]} />,
    action: () => {},
  },
  {
    id: 3,
    title: "listar Categorias",
    icon: () => <Boxes color={colors.zinc[200]} />,
    action: () => {},
  },
  {
    id: 4,
    title: "mais Opções",
    icon: () => <LayoutGrid color={colors.zinc[200]} />,
    action: () => {},
  },
];

function MenuAction() {
  const renderAction = useCallback(({ item }: { item: ActionProps }) => {
    return (
      <TouchableOpacity onPress={() => item.action()}>
        <View className="h-28 w-32 p-3 mr-4 rounded-2xl bg-darkZinc-900 border border-zinc-800">
          <View className="flex-1">{item.icon()}</View>
          <Text className="text-darkZinc-100 text-base leading-none">
            {item.title.replace(" ", "\n")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      horizontal
      data={listAction}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderAction}
      ListFooterComponent={() => <View className="w-4" />}
      className="px-4 mt-6"
    />
  );
}

export { MenuAction };
