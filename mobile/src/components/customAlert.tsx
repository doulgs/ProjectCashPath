import { View, Text, Modal, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import React from "react";

type AlertAction = {
  title: string;
  onPress: () => void;
};

type AlertProps = {
  visible: boolean;
  title: string;
  message: string;
  actions?: AlertAction[];
};

type CustomAlertProps = {
  data: AlertProps;
};

function CustomAlert({ data }: CustomAlertProps) {
  return (
    <Modal transparent statusBarTranslucent animationType="fade" visible={data.visible}>
      <BlurView
        intensity={9}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        className="flex-1 items-center justify-center p-8"
      >
        <View className="gap-3 p-6 rounded-2xl bg-darkZinc-900 border border-zinc-700">
          <View className="">
            <Text className="text-zinc-50 text-3xl">{data.title}</Text>
            <Text className="text-zinc-200 text-lg">{data.message}</Text>
          </View>
          <View className="items-end mt-4">
            {!data.actions ? (
              <TouchableOpacity onPress={() => {}}>
                <Text className="text-zinc-200 text-lg">Ok</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row gap-4">
                {data.actions.map((ac) => (
                  <TouchableOpacity key={ac.title} onPress={() => ac.onPress()}>
                    <Text className="text-zinc-200 text-lg">{ac.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

export { CustomAlert };
