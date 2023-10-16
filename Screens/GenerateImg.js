import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Linking,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import globalStyles from "../components/globalStyles";
import ImageGen from "../components/ImageGen";

export default function GeneratePage({ networkHandlerRef1, navigators }) {
  const [prompt, setPrompt] = useState("");
  const [imageURI, setImageURI] = useState("https://i.imgur.com/R2mxyL0.png");
  const [selectedRadio, setSelectedRadio] = useState("1");
  const sizeParam = ["256x256", "512x512", "1024x1024"];
  const screenWidth = Dimensions.get("window").width;
  const viewSize = screenWidth - 40; // Subtracting the margin
  const outerCircle = {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderColor: "coral",
    borderRadius: 5,
  };
  const innerCircle = {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: "coral",
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.Container}
    >
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Dall-E Generate</Text>
        </View>
        <View style={styles.ContainerTwo}>
          <View
            style={[
              styles.ContainerImage,
              { width: viewSize, height: viewSize },
            ]}
          >
            <Image
              source={{ uri: imageURI }}
              loadingIndicatorSource={require("../assets/WAITING.png")}
              style={globalStyles.Image}
              resizeMode="contain"
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.3)", // Optional: if you want a background to make the text more readable
                padding: 5, // Spacing from the image edges
                borderRadius: 4,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  const supported = await Linking.canOpenURL(imageURI);
                  if (supported) {
                    await Linking.openURL(imageURI);
                  } else {
                    Alert.alert("Error", "Image Link is not Supported", [
                      { text: "OK" },
                    ]);
                  }
                }}
              >
                <Image
                  source={require("../assets/download.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.text}>Prompt :</Text>
          <TextInput
            onChangeText={(text2) => setPrompt(text2)}
            defaultValue=""
            style={styles.input}
            placeholder="Your Idea"
            maxLength={100}
            textAlign="left"
            cursorColor="coral"
          />
          <View style={styles.Radio}>
            <RadioButton
              label="1024x1024"
              value="2"
              selectedValue={selectedRadio} //Current Selected Value. Used to show Tick Mark
              onValueChange={setSelectedRadio} //Changes Selected Radio
              outerCircleStyle={outerCircle}
              innerCircleStyle={innerCircle}
            />
            <RadioButton
              label="512x512"
              value="1"
              selectedValue={selectedRadio}
              onValueChange={setSelectedRadio}
              outerCircleStyle={outerCircle}
              innerCircleStyle={innerCircle}
            />
            <RadioButton
              label="256x256"
              value="0"
              selectedValue={selectedRadio}
              onValueChange={setSelectedRadio}
              outerCircleStyle={outerCircle}
              innerCircleStyle={innerCircle}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={async function () {
                await ImageGen(
                  networkHandlerRef1,
                  prompt,
                  sizeParam[parseInt(selectedRadio)],
                  setImageURI,
                  navigators
                );
                console.log("Submit Pressed");
              }}
            >
              <Text style={[globalStyles.button, { marginTop: 20 }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
    marginLeft: 20,
  },
  Header: {
    //flex:0.1
    height: 70,
    backgroundColor: "coral",
    justifyContent: "center",
  },
  ContainerTwo: {
    //flex: 1,
    backgroundColor: "white",
    margin: 20,
  },
  ContainerImage: {
    backgroundColor: "#ebf1fa",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e1e7f0",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#ebf1fa",
    height: 40,
    padding: 8,
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
  Radio: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 50,
  },
});
