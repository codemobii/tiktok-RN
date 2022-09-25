import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import StarRating from "react-native-star-rating";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function EmojiApp() {
  const emojis = [
    require("../assets/lottie/emoji1.json"),
    require("../assets/lottie/emoji2.json"),
    require("../assets/lottie/emoji3.json"),
    require("../assets/lottie/emoji4.json"),
    require("../assets/lottie/emoji5.json"),
  ];
  const colors = ["#EB514B", "#ED8E5F", "#5B0DF3", "#6D84F4", "#90DA62"];

  const imageW = width;
  const imageH = height;
  const spacing = 10;

  const spacer_w = (width - imageW) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {colors.map((item, index) => {
          const inputRange = [
            (index - 2) * imageW,
            (index - 1) * imageW,
            index * imageW,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const borderRadius = scrollX.interpolate({
            inputRange,
            outputRange: [1000, 0, 1000],
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: width,
                height: height,
                position: "absolute",
                opacity,
                transform: [{ scale }],
                backgroundColor: item,
                borderRadius: borderRadius,
              }}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={emojis}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
        snapToInterval={imageW}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * imageW,
            (index - 1) * imageW,
            index * imageW,
          ];

          const bounce = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.2, 1],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width,
                alignItems: "center",
                transform: [{ scale: bounce }],
                backgroundColor: "transparent",
              }}
            >
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                source={item}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
