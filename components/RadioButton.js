import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioButton = ({
  label,
  value,
  selectedValue,
  onValueChange,
  outerCircleStyle = {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderColor: "#000",
    borderRadius: 10,
  },
  innerCircleStyle = {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
}) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => onValueChange(value)}
    >
      <View style={[styles.outerCircle, outerCircleStyle]}>
        {isSelected && <View style={[styles.innerCircle, innerCircleStyle]} />}
      </View>
      {label && <Text>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  innerCircle: {},
});

export default RadioButton;
