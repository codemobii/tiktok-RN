import { View, Text } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";

export default function Sun() {
  return (
    <Svg width="200" height="200" viewBox="0 0 200 200">
      <Circle cx="100" cy="100" r="100" fill="white" fillOpacity="0.3" />
      <Circle cx="100" cy="100" r="65" fill="white" fillOpacity="0.4" />
      <Circle cx="100" cy="100" r="35" fill="#FADC4A" />
    </Svg>
  );
}
