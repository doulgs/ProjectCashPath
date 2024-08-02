import { ptBR } from "@/utils/localeCalendarConfig";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react-native";
import React, { useEffect, useState, forwardRef, useImperativeHandle, Ref } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

type MonthSelectorProps = {
  onChange: (date: Date) => void;
};

type MonthSelectorHandle = {
  setToCurrentMonth: () => void;
};

const MonthSelector = forwardRef<MonthSelectorHandle, MonthSelectorProps>(
  ({ onChange }, ref) => {
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const translateX = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      setToCurrentMonth: () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        setSelectedMonthIndex(currentMonth);
        setSelectedYear(currentYear);
        onChange(new Date(currentYear, currentMonth));
      },
    }));

    useEffect(() => {
      const selectedDate = new Date(selectedYear, selectedMonthIndex);
      onChange(selectedDate);
    }, [selectedMonthIndex, selectedYear]);

    const handlePrevious = () => {
      translateX.value = -300; // Slide to left
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });

      setSelectedMonthIndex((prevIndex) => {
        if (prevIndex === 0) {
          setSelectedYear((prevYear) => prevYear - 1);
          return 11;
        }
        return prevIndex - 1;
      });
    };

    const handleNext = () => {
      translateX.value = 300; // Slide to right
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });

      setSelectedMonthIndex((prevIndex) => {
        if (prevIndex === 11) {
          setSelectedYear((prevYear) => prevYear + 1);
          return 0;
        }
        return prevIndex + 1;
      });
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    return (
      <View className="flex-row items-center p-2 bg-darkZinc-900">
        <Pressable onPress={handlePrevious} className="p-3">
          <CircleChevronLeft size={24} color="white" />
        </Pressable>
        <Animated.View
          className={"flex-1 flex-row items-center justify-center"}
          style={animatedStyle}
        >
          <View className="h-9 w-24 rounded-lg items-center justify-center">
            <Text className="text-zinc-300">
              {ptBR.monthNames[(selectedMonthIndex + 11) % 12]}
            </Text>
          </View>

          <View className="bg-black h-10 border border-zinc-800 w-24 mx-4 rounded-lg items-center justify-center">
            <Text className="text-zinc-100 font-bold">
              {ptBR.monthNames[selectedMonthIndex]}
            </Text>
          </View>

          <View className="h-9 w-24 rounded-lg items-center justify-center">
            <Text className="text-zinc-300">
              {ptBR.monthNames[(selectedMonthIndex + 1) % 12]}
            </Text>
          </View>
        </Animated.View>
        <Pressable onPress={handleNext} className="p-3">
          <CircleChevronRight size={24} color="white" />
        </Pressable>
      </View>
    );
  }
);

export { MonthSelector, MonthSelectorHandle };
