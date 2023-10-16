import { Alert } from "react-native";

export default async function handleLogin(
  networkHandlerRef,
  username,
  passwd,
  setToken,
  navigators
) {
  try {
    await networkHandlerRef.current.callLogin(username, passwd).then((res) => {
      setToken(networkHandlerRef.current.token);
    });
    navigators.navigate("Generate");
  } catch (error) {
    setToken("0");
    if (error.message === "No response received from server") {
      Alert.alert("Connection Error", "Cannot reach server.", [
        {
          text: "Retry",
          onPress: () => console.log("No response received from server"),
        },
      ]);
    } else if (error === 401) {
      Alert.alert("Oops", "You entered wrong username or password", [
        {
          text: "Retry",
          onPress: () => console.log("Login failed with status 401"),
        },
      ]);
    } else {
      Alert.alert("Error", "An unexpected error occurred.", [
        {
          text: "Retry",
          onPress: () => console.log("Unexpected error:", error),
        },
      ]);
    }
  }
  //   console.log(error);
  //   setToken("0");
  //   Alert.alert("Oops", "Login Failed", [
  //     {
  //       text: "Retry",
  //       onPress: () => console.log("Login failed with status 401"),
  //     },
  //   ]);
  // }
}
