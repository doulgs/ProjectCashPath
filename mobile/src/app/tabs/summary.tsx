import clsx from "clsx";
import dayjs from "dayjs";

import { useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { transactionsService } from "@/services/Transactions";
import { useToken } from "@/storages/useToken";

import { Loading } from "@/components/loading";
import { MonthSelector, MonthSelectorHandle } from "@/components/monthSelector";

import { formatToCurrency } from "@/utils/formatToCurrency";

import { CalendarDays, CalendarSearchIcon, Filter } from "lucide-react-native";

export default function Summary() {
  const monthSelectorRef = useRef<MonthSelectorHandle>(null);

  const { setOptions } = useNavigation();
  const { listMonth } = transactionsService();

  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<SectionTransaction[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const handleMonthChange = (date: Date) => {
    // Lógica para recarregar os dados com base no mês selecionado
    setSelectedDate(date);
  };

  const handleCurrentMonth = () => {
    monthSelectorRef.current?.setToCurrentMonth();
  };

  /*   const renderTransactions = useCallback(
    ({ item: transaction }: { item: TypeTransaction }) => {
      return (
        <View className="flex-row bg-zinc-900 items-center rounded-xl m-2 p-4 gap-4">
          <Image
            source={{ uri: transaction.account.image_url }}
            resizeMode="contain"
            className="h-12 w-12 rounded-2xl"
          />
          <View className="flex-row flex-1 items-center justify-between">
            <View className="flex-1">
              <Text className="text-zinc-100 text-xl" numberOfLines={2}>
                {transaction.description}
              </Text>
              <Text className="text-zinc-300 text-sm" numberOfLines={1}>
                {transaction.category.name}
              </Text>
              <Text className="text-zinc-300 text-sm" numberOfLines={1}>
                {transaction.account.name}
              </Text>
            </View>
            <View className="items-end">
              <Text
                className={clsx(
                  "text-xl",
                  transaction.transactionType === "EXPENSE" && "text-redHighlight-500",
                  transaction.transactionType === "INCOME" && "text-greenHighlight-500"
                )}
              >
                {formatToCurrency(transaction.value)}
              </Text>
              <Text className="text-zinc-400 text-sm">{transaction.user.name}</Text>
            </View>
          </View>
        </View>
      );
    },
    [selectedDate]
  ); */

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) => {
      return (
        <View className="w-full items-center justify-center mt-2">
          <Text className="p-1 bg-zinc-700 text-zinc-400 rounded-lg">
            {dayjs(title).format("DD/MM/YYYY")}
          </Text>
        </View>
      );
    },
    []
  );

  const listEmptyComponent = useCallback(() => {
    return (
      <View className="p-6 items-center justify-center mt-2">
        <Text className="p-1 bg-zinc-700 text-zinc-400 rounded-lg text-center">
          Não há transações para este mês. {`\n`} Por favor, selecione outro mês.
        </Text>
      </View>
    );
  }, []);

  useLayoutEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    setOptions({
      headerLeft: () => (
        <View className="px-6">
          <Text className="text-zinc-400 text-sm">seus lançamentos</Text>
          <Text className="text-zinc-200 font-semibold">mensais</Text>
        </View>
      ),
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
  }, [setOptions, selectedDate]);

  useEffect(() => {
    async function fetch() {
      try {
        const token = await useToken().getToken();

        if (!token) {
          throw new Error("Token not found");
        }

        const result = await listMonth(selectedDate, token);

        // Separar e calcular os totais de 'income' e 'expense'
        const { incomes, expenses, totalIncome, totalExpense } = result.reduce(
          (acc, section) => {
            section.data.forEach((transaction) => {
              if (transaction.transactionType === "INCOME") {
                //acc.incomes.push(transaction);
                acc.totalIncome += transaction.value;
              } else if (transaction.transactionType === "EXPENSE") {
                //acc.expenses.push(transaction);
                acc.totalExpense += transaction.value;
              }
            });
            return acc;
          },
          {
            incomes: [],
            expenses: [],
            totalIncome: 0,
            totalExpense: 0,
          }
        );

        setTransactions(result);
        setTotalExpense(totalExpense);
        setTotalIncome(totalIncome);
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
        renderItem={({ item: transaction }) => (
          <View className="flex-row bg-zinc-900 items-center rounded-xl m-2 p-4 gap-4">
            <Image
              source={{ uri: transaction.account.image_url }}
              resizeMode="contain"
              className="h-12 w-12 rounded-2xl"
            />
            <View className="flex-row flex-1 items-center justify-between">
              <View className="flex-1">
                <Text className="text-zinc-100 text-xl" numberOfLines={2}>
                  {transaction.description}
                </Text>
                <Text className="text-zinc-300 text-sm" numberOfLines={1}>
                  {transaction.category.name}
                </Text>
                <Text className="text-zinc-300 text-sm" numberOfLines={1}>
                  {transaction.account.name}
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className={clsx(
                    "text-xl",
                    transaction.transactionType === "EXPENSE" && "text-redHighlight-500",
                    transaction.transactionType === "INCOME" && "text-greenHighlight-500"
                  )}
                >
                  {formatToCurrency(transaction.value)}
                </Text>
                <Text className="text-zinc-400 text-sm">{transaction.user.name}</Text>
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={listEmptyComponent}
      />

      <View className="flex-row items-center p-4 bg-zinc-900 border-[0.5px] border-zinc-700">
        <View className="flex-1 items-center justify-center ">
          <Text className="text-redHighlight-500 text-lg">
            {formatToCurrency(totalExpense)}
          </Text>
          <Text className="text-redHighlight-500">saidas</Text>
        </View>
        <View className="flex-1 items-center justify-center ">
          <Text className="text-greenHighlight-500 text-lg">
            {formatToCurrency(totalIncome)}
          </Text>
          <Text className="text-greenHighlight-500">entrdas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
