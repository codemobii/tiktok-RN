import { View, Animated } from "react-native";
import React from "react";
export default function Cloud({ left = 0, top = 0, color = "#fff" }) {
  return (
    <View style={{ position: "absolute", top: top, left: left }}>
      <Animated.View
        style={{
          width: 100,
          height: 20,
          borderRadius: 100,
          backgroundColor: color,
          marginBottom: 10,
        }}
      />
      <Animated.View
        style={{
          width: 100,
          height: 20,
          borderRadius: 100,
          backgroundColor: color,
          marginLeft: 30,
          position: "absolute",
          top: 15,
        }}
      />
      <Animated.View
        style={{
          width: 80,
          height: 20,
          borderRadius: 100,
          backgroundColor: color,
          marginLeft: 10,
        }}
      />
    </View>
  );
}
