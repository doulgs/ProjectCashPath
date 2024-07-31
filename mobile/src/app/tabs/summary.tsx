import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MonthSelector, MonthSelectorHandle } from "@/components/monthSelector";

import { CalendarDays, CalendarSearchIcon, Filter } from "lucide-react-native";

import { Loading } from "@/components/loading";
import { transactionsService } from "@/services/Transactions";
import { useToken } from "@/storages/useToken";
import { formatToCurrency } from "@/utils/formatToCurrency";
import dayjs from "dayjs";

export default function Summary() {
  const { listMonth } = transactionsService();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<SectionTransaction[]>([]);
  const monthSelectorRef = useRef<MonthSelectorHandle>(null);

  const handleMonthChange = (date: Date) => {
    // Lógica para recarregar os dados com base no mês selecionado
    // Aqui você pode adicionar a lógica para buscar dados do servidor ou atualizar o estado local com os novos dados
    setSelectedDate(date);
  };

  const handleCurrentMonth = () => {
    monthSelectorRef.current?.setToCurrentMonth();
  };

  useLayoutEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row gap-6 px-6">
          {selectedMonth !== currentMonth || selectedYear !== currentYear ? (
            <TouchableOpacity onPress={handleCurrentMonth}>
              <CalendarDays size={20} color="#fff" />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={handleCurrentMonth}>
            <CalendarSearchIcon size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert("Botão pressionado!")}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, selectedDate]);

  useEffect(() => {
    async function fetch() {
      try {
        const token = await useToken().getToken();

        if (!token) {
          throw new Error("Token not found");
        }

        const result = await listMonth(selectedDate, token);

        setTransactions(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetch();
  }, [selectedDate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-darkZinc-800">
      <MonthSelector ref={monthSelectorRef} onChange={handleMonthChange} />

      <SectionList
        sections={transactions}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item }) => (
          <View className="flex-row bg-zinc-900 items-center rounded-xl m-2 p-4 gap-4">
            <Image
              source={{ uri: item.account.image_url }}
              resizeMode="contain"
              className="h-12 w-12 rounded-2xl"
            />
            <View className="flex-row flex-1 items-center justify-between">
              <View>
                <Text className="text-zinc-100 text-xl">{item.description}</Text>
                <Text className="text-zinc-300 text-sm">{item.category.name}</Text>
                <Text className="text-zinc-300 text-sm">{item.account.name}</Text>
              </View>
              <View className="items-end">
                <Text className="text-zinc-100 text-xl">
                  {formatToCurrency(item.value)}
                </Text>
                <Text className="text-zinc-400 text-sm">{item.user.name}</Text>
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="w-full items-center justify-center mt-2">
            <Text className="p-1 bg-zinc-700 text-zinc-400 rounded-lg">
              {dayjs(title).format("DD/MM/YYYY")}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
