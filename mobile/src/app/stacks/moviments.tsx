import dayjs from "dayjs";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useFocusEffect } from "expo-router";
import { CalendarDays, ChevronsUpDown, ClipboardPenLine } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

import { Button } from "@/components/button";

import { Calendar } from "@/components/callendar";
import { CustomModal } from "@/components/customModal";
import { Input } from "@/components/input";
import { CustomLinearGradient } from "@/components/linearGradient";
import { colors } from "@/styles/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToken } from "@/storages/useToken";
import { categoriesService, CategoryProps } from "@/services/Categories";
import { Loading } from "@/components/loading";
import { accountsService } from "@/services/Accounts";

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
}

type FormData = {
  value: string;
  descricao: string;
  date: string;
  category: string;
  account: string;
};

const data = [
  { key: "2", value: "Appliances" },
  { key: "3", value: "Cameras" },
  { key: "5", value: "Vegetables" },
  { key: "6", value: "Diary Products" },
  { key: "7", value: "Drinks" },
];

export default function Moviments() {
  const { getAllCategory } = categoriesService();
  const { getAllAccounts } = accountsService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({});

  //DATA
  const [isLoading, setIsLoading] = useState(false);
  const [movimentType, setMovimentType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [categoryList, setCategoryList] = useState<{ key: number; value: string }[]>([]);
  const [accountList, setAccountList] = useState<{ key: number; value: string }[]>([]);
  const [movimentDate, setMovimentDate] = useState<string>(
    dayjs(new Date()).format("DD [de] MMMM [de] YYYY")
  );

  //MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE);

  //FUNCTION

  const switchType = () => {
    setMovimentType(movimentType === "INCOME" ? "EXPENSE" : "INCOME");
  };

  const formatCurrency = (text: string) => {
    // Remove all non-numeric characters
    let cleanText = text.replace(/[^0-9]/g, "");

    // Convert to number and format to currency
    let number = parseFloat(cleanText) / 100;
    if (isNaN(number)) number = 0;

    // Format number to currency string
    return `R$ ${number.toFixed(2)}`;
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const clearInputs = () => {};

  async function fetchCategory() {
    try {
      setIsLoading(true);
      const token = await useToken().getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const listCategories = await getAllCategory(token);

      const categories = listCategories.map((c) => {
        return { key: c.id, value: c.name };
      });

      setCategoryList(categories);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function fetchAccount() {
    try {
      setIsLoading(true);
      const token = await useToken().getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const listAccounts = await getAllAccounts(token);

      const accounts = listAccounts.map((c) => {
        return { key: c.id, value: c.name };
      });

      setAccountList(accounts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategory();
      fetchAccount();

      return () => {};
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CustomLinearGradient
        colors={
          movimentType === "INCOME"
            ? ["#003519", "#014923", "#020202"]
            : ["#3b0000", "#630000", "#020202"]
        }
      >
        <View className="h-72 w-full pt-16 p-6">
          <View className="flex-row items-center justify-between mt-6">
            <Pressable
              className="flex-row bg-zinc-900 px-4 py-2 rounded-xl gap-2"
              onPress={switchType}
            >
              <Text className="text-white text-xl font-bold">
                {movimentType === "INCOME" ? "Receita" : "Despesa"}
              </Text>
            </Pressable>
            <Pressable
              className="flex-row  px-4 py-2 rounded-xl gap-2"
              onPress={() => {}}
            >
              <Text className="text-white text-xl font-bold">cancelar</Text>
            </Pressable>
          </View>

          <View className="mt-10 mb-4">
            <Text className="text-white font-bold text-xl ">valor</Text>
          </View>

          <Controller
            control={control}
            name="value"
            defaultValue="R$ 0.00"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="R$ 0.00"
                onBlur={onBlur}
                onChangeText={(text) => onChange(formatCurrency(text))}
                value={value}
                keyboardType="numeric"
                className="text-white text-5xl"
              />
            )}
          />
        </View>

        <KeyboardAwareScrollView className="rounded-t-3xl bg-zinc-900 overflow-hidden p-6">
          <View className="mb-6">
            <Text className="mb-4 text-lg text-zinc-200 font-semibold">Descrição</Text>
            <Input>
              <Input.ControlledField
                name="descricao"
                control={control}
                placeholder="nome da movimentação"
                keyboardType="email-address"
              />
              <ClipboardPenLine color={colors.zinc[400]} />
            </Input>
            {errors.descricao && (
              <Text className="text-red-500 ml-4">{errors.descricao.message}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="mb-4 text-lg text-zinc-200 font-semibold">
              Selecione a data
            </Text>

            <Controller
              control={control}
              name="date"
              defaultValue={dayjs(new Date()).format("DD [de] MMMM [de] YYYY")}
              render={({ field: { onChange, onBlur, value } }) => (
                <Pressable className="h-[50px] bg-zinc-800 px-4 rounded-2xl flex-row items-center border border-zinc-700">
                  <TextInput
                    onBlur={onBlur}
                    value={movimentDate}
                    onChangeText={(t) => onChange(t)}
                    className="text-white flex-1"
                    showSoftInputOnFocus={false}
                    onFocus={() => Keyboard.dismiss()}
                    onPressIn={() => setShowModal(MODAL.CALENDAR)}
                  />
                  <CalendarDays color={colors.zinc[400]} />
                </Pressable>
              )}
            />
            {errors.account && (
              <Text className="text-red-500 ml-4">{errors.account.message}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="mb-4 text-lg text-zinc-200 font-semibold">Conta</Text>
            <Controller
              control={control}
              name="account"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectList
                  setSelected={onChange}
                  data={accountList}
                  save="key"
                  placeholder="Vincule uma conta"
                  boxStyles={{
                    width: "100%",
                    alignItems: "center",
                    height: 50,
                    borderWidth: 1,
                    borderColor: colors.zinc[500],
                    backgroundColor: colors.zinc[800],
                  }}
                  search={false}
                  inputStyles={{ color: colors.zinc[100] }}
                  dropdownItemStyles={{ marginVertical: 4 }}
                  dropdownTextStyles={{ color: colors.zinc[100] }}
                  dropdownStyles={{ backgroundColor: colors.zinc[800] }}
                  arrowicon={<ChevronsUpDown color={colors.zinc[400]} />}
                />
              )}
            />
            {errors.account && (
              <Text className="text-red-500 ml-4">{errors.account.message}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="mb-4 text-lg text-zinc-200 font-semibold">Categoria</Text>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectList
                  setSelected={onChange}
                  data={categoryList}
                  save="key"
                  placeholder="Selecione a categoria"
                  boxStyles={{
                    width: "100%",
                    alignItems: "center",
                    height: 50,
                    borderWidth: 1,
                    borderColor: colors.zinc[500],
                    backgroundColor: colors.zinc[800],
                  }}
                  inputStyles={{ color: colors.zinc[100] }}
                  dropdownItemStyles={{ marginVertical: 4 }}
                  dropdownTextStyles={{ color: colors.zinc[100] }}
                  dropdownStyles={{ backgroundColor: colors.zinc[800] }}
                  arrowicon={<ChevronsUpDown color={colors.zinc[400]} />}
                  searchPlaceholder="Buscar"
                />
              )}
            />
            {errors.category && (
              <Text className="text-red-500 ml-4">{errors.category.message}</Text>
            )}
          </View>

          <View className="h-[50px] mb-6">
            <Button isLoading={false} onPress={handleSubmit(onSubmit)}>
              <Button.Title>Confirmar</Button.Title>
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </CustomLinearGradient>

      <CustomModal
        title="Selecionar data"
        subtitle="Selecione a data da movimentação"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            onDayPress={(day) => {
              setMovimentDate(dayjs(day.dateString).format("DD [de] MMMM [de] YYYY")),
                setShowModal(MODAL.NONE);
            }}
            markedDates={{
              [movimentDate]: { selected: true },
            }}
          />
        </View>
      </CustomModal>
    </>
  );
}
