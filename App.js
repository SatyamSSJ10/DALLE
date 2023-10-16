import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetworkHandler from "./components/clientcalls";
import Login from "./Screens/Login";
import GenerateImg from "./Screens/GenerateImg";
import React, { useState, useRef, useContext } from "react";

export const NetworkHandlerContext = React.createContext();
export function NetworkHandlerProvider({ children }) {
  const networkHandlerRef = useRef(null);
  if (!networkHandlerRef.current) {
    networkHandlerRef.current = new NetworkHandler();
  }

  return (
    <NetworkHandlerContext.Provider value={networkHandlerRef}>
      {children}
    </NetworkHandlerContext.Provider>
  );
}

function LoginScreen({ navigation }) {
  const networkHandlerRef = useContext(NetworkHandlerContext);

  return (
    <Login networkHandlerRef1={networkHandlerRef} navigators={navigation} />
  );
}

function GeneratePage({ navigation }) {
  const networkHandlerRef = useContext(NetworkHandlerContext);

  return (
    <GenerateImg
      networkHandlerRef1={networkHandlerRef}
      navigators={navigation}
    />
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NetworkHandlerProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Generate" component={GeneratePage} />
        </Stack.Navigator>
      </NetworkHandlerProvider>
    </NavigationContainer>
  );
}

export default App;
