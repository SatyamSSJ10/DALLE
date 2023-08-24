import { StatusBar } from "expo-status-bar";
import NetworkHandler from "./components/clientcalls";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";

export default function App() {
  const networkHandlerRef = useRef(null);

  // Check if the ref is currently null before initializing
  if (!networkHandlerRef.current) {
    networkHandlerRef.current = new NetworkHandler();
  }
  const [token, setToken] = useState("0000000");
  const [username, setUser] = useState("user1");
  const [passwd, setPass] = useState("password1");

  const handleLogin = async () => {
    await networkHandlerRef.current
      .callLogin(username, passwd)
      .then((res) => {
        setToken(networkHandlerRef.current.token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.containerPrimary}>
        <Text style={styles.text1}>Log in</Text>
        <View style={styles.container}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            onChangeText={(text1) => setUser(text1)}
            defaultValue="Username"
            style={styles.input}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            onChangeText={(text2) => setPass(text2)}
            defaultValue="Password"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button}>Log In</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
{
  /* <Button
  title="Log In"
  onPress={handleLogin}
  color="coral"
  style={styles.button}
/>; */
}
const styles = StyleSheet.create({
  containerPrimary: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
    //flexDirection: "column",
  },
  container: {
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 20,
  },
  input: {
    backgroundColor: "#ebf1fa",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#e1e7f0",
    color: "#626f85",
    textAlign: "center",
  },
  text: {
    color: "black",
    backgroundColor: "#fff",
    //paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text1: {
    //textAlign: "center",
    fontSize: 36,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  button: {
    padding: 10,
    color: "coral",
    //backgroundColor: "coral",
    shadowColor: "coral",
    fontSize: 16,
    borderRadius: 5,
    fontWeight: "bold",
    textAlign: "center",
    width: "40%",
    borderColor: "coral",
    borderWidth: 1,
  },
});
