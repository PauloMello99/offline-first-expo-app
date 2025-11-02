import "react-native-reanimated";
import "../global.css";

import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import database from "@/db";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={DarkTheme}>
        <GluestackUIProvider mode="dark">
          <DatabaseProvider database={database}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="blog/[id]" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </DatabaseProvider>
        </GluestackUIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
