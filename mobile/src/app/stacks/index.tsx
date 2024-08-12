import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import dayjs from "dayjs";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

import { transactionsService } from "@/services/Transactions";
import { useToken } from "@/storages/useToken";

import { CustomAlert } from "@/components/customAlert";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { MenuAction } from "@/components/menuAction";
import { MonthSelector, MonthSelectorHandle } from "@/components/monthSelector";
import { useUserStore } from "@/storages/useUserStore";
import { colors } from "@/styles/colors";

import { formatToCurrency } from "@/utils/formatToCurrency";
import HeaderBottomSheet from "@/components/headerBottonSheat";

export default function Home() {
  const sheetRef = useRef<BottomSheet>(null);
  const monthSelectorRef = useRef<MonthSelectorHandle>(null);
  // hooks
  const { user, logout } = useUserStore();
  const { listMonth } = transactionsService();

  // states
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<SectionTransaction[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const snapPoints = useMemo(() => ["50%", "87%"], []);

  // callbacks
  const handleMonthChange = (date: Date) => {
    // Lógica para recarregar os dados com base no mês selecionado
    setSelectedDate(date);
  };

  const handleCurrentMonth = () => {
    monthSelectorRef.current?.setToCurrentMonth();
  };

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setIsHeaderVisible(index === 1);
  }, []);

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) => {
      return (
        <View className="w-full items-center justify-center mt-2">
          <Text className="px-1 bg-zinc-700 text-zinc-400 rounded-lg text-sm">
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

  const changeOpenAlert = () => {
    setAlertVisible(!alertVisible);
  };

  async function signOut() {
    logout();
    router.navigate("/");
  }

  useFocusEffect(
    useCallback(() => {
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
          setTotalBalance(totalIncome - totalExpense);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }

      fetch();
      return () => {};
    }, [selectedDate])
  );

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-darkZinc-800">
      <Header
        userName={user.name}
        month={dayjs(selectedDate).format("MMMM")}
        totalBalance={totalBalance}
        totalExpenses={totalExpense}
        totalIncome={totalIncome}
        signOut={changeOpenAlert}
      />

      <MenuAction />

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={{ backgroundColor: colors.darkZinc[900] }}
        handleComponent={HeaderBottomSheet}
      >
        <MonthSelector ref={monthSelectorRef} onChange={handleMonthChange} />
        <BottomSheetSectionList
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
                      transaction.transactionType === "EXPENSE" &&
                        "text-redHighlight-500",
                      transaction.transactionType === "INCOME" &&
                        "text-greenHighlight-500"
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
      </BottomSheet>

      <CustomAlert
        data={{
          visible: alertVisible,
          title: "Sistema",
          message: "Tem certeza que deseja sair do sistema?",
          actions: [
            {
              title: "Cancelar",
              onPress: () => {
                changeOpenAlert();
              },
            },
            {
              title: "Confirmar",
              onPress: async () => {
                changeOpenAlert(), await logout();
              },
            },
          ],
        }}
      />
    </SafeAreaView>
  );
}

//Tranferir layout da summary para o index
