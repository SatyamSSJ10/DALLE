import NetworkHandler from "../components/clientcalls";
import LOGINhandler from "../components/Login";
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
import React, { useState, useRef, useEffect } from "react";

export default function app({ networkHandlerRef1, navigators }) {
  const [token, setToken] = useState("0");
  const [username, setUser] = useState("user1");
  const [passwd, setPass] = useState("password1");

  useEffect(() => {
    console.log(token.length);
    // Do some function
    /*
    if(token.length>1){
     navigators.navigate("Generate",{ TOKEN: token })
    }
    */
  }, [token]);

  return (
    <TouchableWithoutFeedback
      style={{ backgroundColor: "#fff" }}
      onPress={() => Keyboard.dismiss()}
    >
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
          <TouchableOpacity
            onPress={async function logon() {
              await LOGINhandler(
                networkHandlerRef1,
                username,
                passwd,
                setToken,
                navigators
              );
            }}
          >
            <Text style={styles.button}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containerPrimary: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    //margin: 20,
    padding: 10,
  },
  container: {
    backgroundColor: "#fff",
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
    paddingBottom: 5,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text1: {
    fontSize: 36,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  button: {
    padding: 10,
    color: "coral",
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
