import { StatusBar } from "expo-status-bar";
import { View, Text, Animated, Image, Dimensions, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Svg, { Circle, ClipPath, Path, Rect } from "react-native-svg";
import Forest from "./Forest";
import Sun from "./Sun";
import Cloud from "./Cloud";
import Moon from "./Moon";
// import {  } from "react-native-web";

const WIDTH = Dimensions.get("window").width;

const TIMING = 500;

export default function NightAndDay() {
  // animate color on toggle

  const color = new Animated.Value(0);

  const [changed, setChanged] = useState(false);

  const handleNight = () => {
    Animated.timing(color, {
      toValue: 0,
      duration: TIMING,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(color, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleDay = () => {
    Animated.timing(color, {
      toValue: 1,
      duration: TIMING,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(color, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: false,
      }).start();
    });
  };

  const cloudColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#4F5C86"],
  });

  const skyColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["#5CCCF6", "#1B3168"],
  });

  const forestColorOne = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["#4BA5C3", "#1B2756"],
  });

  const forestColorTwo = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["#4090AA", "#1B3168"],
  });

  const transitionAnimation = () => {
    return {
      transform: [
        { perspective: 800 },

        {
          translateX: color.interpolate({
            inputRange: [0, 1],
            outputRange: [0, WIDTH],
          }),
        },
        {
          translateY: color.interpolate({
            inputRange: [0, 1],
            outputRange: [0, WIDTH],
          }),
        },
      ],
    };
  };

  return (
    <>
      <StatusBar hidden />

      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: skyColor,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Cloud top={150} left={10} color={cloudColor} />

          <Cloud top={20} left={150} color={cloudColor} />

          <Cloud top={100} left={WIDTH - 30} color={cloudColor} />

          <Cloud top={WIDTH + 100} left={150} color={cloudColor} />

          <Animated.View
            style={{
              marginTop: WIDTH,
              width: 300,
              height: 600,
              position: "relative",
              justifyContent: "space-between",
              alignItems: "center",
              transform: [
                {
                  rotate: color.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            }}
          >
            <Sun />

            <Moon />
          </Animated.View>

          <View style={{ position: "absolute", bottom: 40 }}>
            <Forest color={forestColorOne} />
          </View>

          <View style={{ position: "absolute", bottom: 0 }}>
            <Forest color={forestColorTwo} />
          </View>
        </Animated.View>

        <View
          style={{
            flex: 0.2,
            backgroundColor: "#fff",
            position: "relative",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={{ fontSize: 24 }}>08:90 AM</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button onPress={handleNight} title="Night" />

            <View
              style={{
                height: 30,
                width: 1,
                backgroundColor: "#FADC4A",
                marginHorizontal: 10,
              }}
            />

            <Button onPress={handleDay} title="Day" />
          </View>
        </View>
      </View>
    </>
  );
}
