import clsx from "clsx";
import dayjs from "dayjs";

import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { ChevronUp } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/button";

import { Calendar } from "@/components/callendar";
import { CustomModal } from "@/components/customModal";

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  CATEGORIES = 2,
  ACCONTS = 3,
}

type FormData = {
  value: string;
  title: string;
  descricao: string;
  date: string;
  category: string;
};

export default function Moviments() {
  const userParams = useLocalSearchParams<{ movimentsType: "income" | "expense" }>()
    .movimentsType;
  const { control, handleSubmit, getValues, reset } = useForm<FormData>();

  //DATA
  const [movimentDate, setMovimentDate] = useState<string>("");

  //MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE);

  //FUNCTION

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data.date);
    clearInputs();
  };

  const clearInputs = () => {};

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, [])
  );

  return (
    <>
      <View
        className={clsx("flex-1", {
          "bg-greenHighlight-700": userParams === "income",
          "bg-red-800": userParams === "expense",
        })}
      >
        <View className="h-80 w-full pt-16 p-6">
          <View className="flex-row items-center justify-between mt-6">
            <Pressable
              className="flex-row bg-zinc-900 px-4 py-2 rounded-xl gap-2"
              onPress={() => {}}
            >
              <Text className="text-white text-xl font-bold">
                {userParams === "income" ? "Receita" : "Despesa"}
              </Text>
              <ChevronUp color={"white"} />
            </Pressable>
            <Pressable
              className="flex-row  px-4 py-2 rounded-xl gap-2"
              onPress={() => {}}
            >
              <Text className="text-white text-xl font-bold">cancelar</Text>
            </Pressable>
          </View>

          <View className="mt-10">
            <Text className="text-white font-bold text-xl ">valor</Text>
          </View>
        </View>
        <ScrollView className="w-full rounded-t-3xl bg-zinc-900 overflow-hidden p-6">
          <View className="gap-2">
            <Text className="text-white font-bold text-xl ">Título</Text>
          </View>
          <View className="gap-2 mt-4">
            <Text className="text-white font-bold text-xl ">Descrição</Text>
          </View>
          <View className="gap-2 mt-4">
            <Text className="text-white font-bold text-xl ">Data</Text>
          </View>

          <View className="gap-2 mt-4">
            <Text className="text-white font-bold text-xl">Conta</Text>
            <View></View>
          </View>

          <View className="gap-2 mt-4">
            <Text className="text-white font-bold text-xl">Categoria</Text>
            <View></View>
          </View>

          <View className="gap-2 mt-6">
            <Button
              variant="ghost"
              className={clsx("h-16 items-center justify-center rounded-xl gap-2 px-2", {
                "bg-green-700": userParams === "income",
                "bg-red-800": userParams === "expense",
              })}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-bold text-xl">Confirmar</Text>
            </Button>
          </View>
        </ScrollView>
      </View>

      <CustomModal
        title="Selecionar data"
        subtitle="Selecione a data da movimentação"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            onDayPress={(day) => {
              setMovimentDate(day.dateString), setShowModal(MODAL.NONE);
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
