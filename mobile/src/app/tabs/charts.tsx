import { Button } from "@/components/button";
import { MonthSelector, MonthSelectorHandle } from "@/components/monthSelector";
import { useRef, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

export default function Chart() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthSelectorRef = useRef<MonthSelectorHandle>(null);

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCurrentMonth = () => {
    monthSelectorRef.current?.setToCurrentMonth();
  };

  return (
    <SafeAreaView className="flex-1 bg-darkZinc-800">
      <MonthSelector ref={monthSelectorRef} onChange={handleMonthChange} />
      <Text>
        Data Selecionada: {selectedDate.toLocaleString("default", { month: "long" })}{" "}
        {selectedDate.getFullYear()}
      </Text>
      <Button onPress={handleCurrentMonth}>
        <Button.Title>
          <Text>Set to Current Month</Text>
        </Button.Title>
      </Button>
    </SafeAreaView>
  );
}
