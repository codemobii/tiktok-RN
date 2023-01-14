import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
  Vibration,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fonts } from "../utils/fonts";
import { Ionicons } from "@expo/vector-icons";

export default function EnterPassword() {
  const [pin, setPin] = useState([]);
  const [widt, setWidt] = useState(new Animated.Value(0));
  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));
  const [isTrue, setIsTrue] = useState(false);

  const bg = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: isTrue ? ["#333F22", "green"] : ["#333F22", "red"],
  });

  const changeWidth = (length) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });

    setWidt(new Animated.Value(30 * length));
  };

  useEffect(() => {
    if (pin.length === 6) {
      const newPin = pin.join("");

      if (newPin === "014262") {
        setIsTrue(true);

        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }).start(() => {
          changeWidth(0);
          setPin([]);
          setTimeout(() => {
            setBackgroundColor(new Animated.Value(0));
          }, 500);
        });
      } else {
        setIsTrue(false);

        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }).start(() => {
          changeWidth(0);
          setPin([]);
          setTimeout(() => {
            setBackgroundColor(new Animated.Value(0));
          }, 500);
        });
      }

      // vibration
      Vibration.vibrate(100);
    }
  }, [pin]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        }}
        style={{ width: 120, height: 120, borderRadius: 100, marginTop: 100 }}
      />

      <Text
        style={{
          fontSize: 24,
          fontFamily: fonts.bold,
          marginTop: 20,
          color: "#fff",
        }}
      >
        Hello, Codemobii
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.regular,
          marginTop: 10,
          color: "#fff",
        }}
      >
        Enter your password to continue
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          height: 30,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            marginTop: 50,
            width: widt,
            height: 30,
            backgroundColor: bg,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        />

        {new Array(6).fill(0).map((_, i) => (
          <View
            key={i}
            style={{
              width: 20,
              height: 20,
              backgroundColor: pin.length > i ? "#C7FF6C" : "#242627",
              borderRadius: 100,
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {new Array(9).fill(0).map((_, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            style={{
              width: 80,
              height: 80,
              marginHorizontal: 20,
              marginVertical: 10,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#282829",
            }}
            onPress={() => {
              const newPin = [...pin];
              if (newPin.length < 6) {
                newPin.push(i + 1);
                setPin(newPin);
              }
              changeWidth(newPin.length);
            }}
          >
            <Text
              style={{ fontSize: 24, fontFamily: fonts.bold, color: "#fff" }}
            >
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 80,
            height: 80,
            marginHorizontal: 20,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="finger-print" size={28} color="#C7FF6C" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 80,
            height: 80,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#282829",
          }}
          onPress={() => {
            const newPin = [...pin];
            if (newPin.length < 6) {
              newPin.push(0);
              setPin(newPin);
            }
            changeWidth(newPin.length);
          }}
        >
          <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: "#fff" }}>
            0
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 70,
            height: 70,
            marginHorizontal: 20,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            const newPin = [...pin];
            if (newPin.length > 0) {
              newPin.pop();
              setPin(newPin);
            }
            changeWidth(newPin.length);
          }}
        >
          <Ionicons name="backspace-outline" size={28} color="#2D2E2E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
