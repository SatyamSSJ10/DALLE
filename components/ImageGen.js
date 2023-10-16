import { Alert } from "react-native";

export default async function ImageGen(
  networkHandlerRef,
  params,
  size,
  setImageURI,
  navigators
) {
  try {
    const imageURI = await networkHandlerRef.current.callImage(params, size);
    console.log(imageURI);
    setImageURI(imageURI);
  } catch (error) {
    setToken("0");
    Alert.alert(
      "Oops",
      "Some Error Occured. Possibly you were logged out!. Click on 'Retry' which will lead you to Login Screen",
      [
        {
          text: "Ok",
          onPress: () => navigators.navigate("LoginScreen"),
        },
      ]
    );
  }
}
