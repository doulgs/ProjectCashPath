import "@/styles/global.css";
import "@/utils/dayjsLocaleConfig";

import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Slot } from "expo-router";
import { StatusBar } from "react-native";

import { Loading } from "@/components/loading";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { Katibeh_400Regular } from "@expo-google-fonts/katibeh";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Katibeh_400Regular,
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center bg-zinc-950" onLayout={onLayoutRootView}>
      <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} translucent />
      <Slot />
    </GestureHandlerRootView>
  );
}
