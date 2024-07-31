import { ActivityIndicator, View } from "react-native";
import { LinearGradient } from "./linearGradient";

export function Loading() {
  return (
    <LinearGradient>
      <ActivityIndicator
        className="flex-1 items-center justify-center text-primary-200"
        size={60}
      />
    </LinearGradient>
  );
}
