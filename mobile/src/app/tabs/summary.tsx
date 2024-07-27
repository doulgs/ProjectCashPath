import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  SectionListData,
  Image,
} from "react-native";

import { MonthSelector, MonthSelectorHandle } from "@/components/monthSelector";

import { CalendarDays, CalendarSearchIcon, Filter } from "lucide-react-native";
import { useDatabase } from "@/hooks/Supabase/useDatabase";
import { Transaction } from "@/types/database";
import { dateFormatter } from "@/utils/dateFormatter";
import { formatToCurrency } from "@/utils/formatToCurrency";

export default function Summary() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthSelectorRef = useRef<MonthSelectorHandle>(null);
  const { transactions, fetchTransactions, loading } = useDatabase();

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCurrentMonth = () => {
    monthSelectorRef.current?.setToCurrentMonth();
  };

  // Definir a tipagem para o objeto agrupado
  type GroupedTransactions = {
    [key: string]: Transaction[];
  };

  const groupedTransactions: GroupedTransactions = transactions.reduce(
    (acc: GroupedTransactions, transaction: Transaction) => {
      const date = dateFormatter(transaction.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );

  const sections = Object.keys(groupedTransactions).map((date) => ({
    title: date,
    data: groupedTransactions[date],
  }));

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
    //fetchTransactions();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-darkZinc-800">
      <MonthSelector ref={monthSelectorRef} onChange={handleMonthChange} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row bg-zinc-900 rounded-xl m-2 p-4 gap-4">
            <Image
              source={{ uri: item.accounts.image_url }}
              resizeMode="contain"
              className="h-12 w-12 rounded-2xl"
            />
            <View className="flex-row flex-1 items-center justify-between">
              <View>
                <Text className="text-zinc-100 text-xl">{item.title}</Text>
                <Text className="text-zinc-300 text-sm">{item.categories.name}</Text>
              </View>
              <View>
                <Text className="text-zinc-100 text-xl">
                  {formatToCurrency(item.amount)}
                </Text>
                <Text className="text-zinc-300 text-sm">{item.accounts.name}</Text>
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="p-2">
            <Text className="text-zinc-400 font-semibold text-xl">{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
