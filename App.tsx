import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FavoritesProvider } from "./src/context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

import EventsScreen from "./src/screens/EventsScreen";
import EventDetailScreen from "./src/screens/EventDetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import CheckoutSuccessScreen from "./src/screens/CheckoutSuccessScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Bottom Tabs ---
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        //headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Events") {
            iconName = "calendar-outline";
          } else if (route.name === "Favorites") {
            iconName = "heart-outline";
          } else {
            iconName = "ellipse"; // fallback
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF", // iOS blue
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}


//--MAIN TABS--//
export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Bottom Tabs as root */}
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            {/* Stacked screens */}
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: "Checkout", headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={CheckoutSuccessScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
