import { Bell, DollarSign, Landmark, LogOut } from "lucide-react-native";
import { Image, Text, View } from "react-native";

import { colors } from "@/styles/colors";
import { formatToCurrency } from "@/utils/formatToCurrency";

type HeaderProps = {
  userName: string;
  month: string;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  signOut: () => void;
};

function Header({
  userName,
  month,
  totalBalance,
  totalIncome,
  totalExpenses,
  signOut,
}: HeaderProps) {
  function salutation() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return "Bom Dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa Tarde";
    } else {
      return "Boa Noite";
    }
  }

  return (
    <View className={`bg-darkZinc-900 min-h-60 pt-16 p-4 gap-4 rounded-b-2xl`}>
      <View className="flex-row w-full items-center justify-between">
        <View className="flex-row gap-2 ml-2">
          <View className="h-12 w-12 items-center justify-center p-2 rounded-2xl border border-zinc-700 overflow-hidden">
            <Image
              source={{ uri: "https://github.com/doulgs.png" }}
              resizeMode="contain"
              className="h-12 w-12 "
            />
          </View>
          <View>
            <Text className="text-zinc-300 text-base font-bold">Olá, {salutation()}</Text>
            <Text className="text-zinc-100 text-xl  font-semibold">{userName}</Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex items-center justify-center p-2 rounded-2xl bg-zinc-800 border border-zinc-700">
            <Bell color={colors.zinc[200]} />
          </View>
          <View className="flex items-center justify-center p-2 rounded-2xl bg-zinc-800 border border-zinc-700">
            <LogOut color={colors.redHighlight[200]} onPress={signOut} />
          </View>
        </View>
      </View>

      <View className="gap-4">
        <Text className="text-primary-200 text-md ml-2 font-semibold">
          Resumo dos lançamentos de {month}
        </Text>

        <View className="flex-row gap-2 p-2 rounded-2xl bg-darkZinc-800 border border-darkZinc-700">
          <View className="h-12 w-12 items-center justify-center p-2 rounded-2xl bg-zinc-900 border border-zinc-700">
            <Landmark color={colors.zinc[200]} />
          </View>
          <View>
            <Text className="text-zinc-300 text-sm font-semibold">saldo atual</Text>
            <Text className="text-zinc-300 text-xl font-semibold">
              {formatToCurrency(totalBalance)}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 flex-row gap-2 p-2 rounded-2xl bg-darkZinc-800 border border-darkZinc-700">
            <View className="h-12 w-12 items-center justify-center p-2 rounded-2xl bg-zinc-900 border border-zinc-700">
              <DollarSign color={colors.greenHighlight[200]} />
            </View>
            <View>
              <Text className="text-zinc-300 text-md font-semibold">receita</Text>
              <Text className="text-zinc-300 text-md font-semibold">
                {formatToCurrency(totalIncome)}
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-row gap-2 p-2 rounded-2xl bg-darkZinc-800 border border-darkZinc-700">
            <View className="h-12 w-12 items-center justify-center p-2 rounded-2xl bg-zinc-900 border border-zinc-700">
              <DollarSign color={colors.redHighlight[300]} />
            </View>
            <View>
              <Text className="text-zinc-300 text-md font-semibold">despesas</Text>
              <Text className="text-zinc-300 text-md font-semibold">
                {formatToCurrency(totalExpenses)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export { Header };
