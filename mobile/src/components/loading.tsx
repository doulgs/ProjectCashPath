import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1">
      <ActivityIndicator className="flex-1 items-center justify-center text-primary-200" size={60} />
    </View>
  );
}
