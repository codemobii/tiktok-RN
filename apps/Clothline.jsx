import { View, Text, Dimensions, Animated, Image } from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Draggable from "react-native-draggable";

export default function Clothline() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  //   const AnimatedDraggable = Animated.createAnimatedComponent(Draggable);

  const DATA = [
    {},
    {
      img: require("../assets/clothes/cloth1.png"),
      color: "red",
    },
    {
      img: require("../assets/clothes/cloth2.png"),
      color: "blue",
    },
    {
      img: require("../assets/clothes/cloth3.png"),
      color: "green",
    },
    {},
  ];

  const imageW = width * 0.72;
  const imageH = imageW * 1.65;
  const spacing = 10;

  const spacer_w = (width - imageW) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [canScroll, setCanScroll] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: imageH / 2,
        elevation: 5,
      }}
    >
      <Animated.FlatList
        style={{ flex: 1 }}
        data={DATA}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 150,
        }}
        snapToInterval={imageW}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEnabled={canScroll}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * imageW,
            (index - 1) * imageW,
            index * imageW,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-100, 0, -100],
          });

          const rotate = scrollX.interpolate({
            inputRange,
            outputRange: ["-30deg", "0deg", "30deg"],
          });

          if (!item.img) {
            return <View style={{ width: spacer_w }} />;
          }

          return (
            <View
              style={{
                width: imageW,
              }}
            >
              <Animated.View
                style={{
                  marginHorizontal: spacing * 2,
                  transform: [
                    { translateY },
                    {
                      rotate,
                    },
                  ],
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  {/* <Image
                    source={item.img}
                    style={{
                      width: "100%",
                      height: imageH,
                      resizeMode: "contain",
                    }}
                  /> */}
                  <Draggable
                    x={-5}
                    y={100}
                    renderSize={260}
                    imageSource={item.img}
                    isCircle
                    shouldReverse
                    onDrag={() => setCanScroll(false)}
                    onDragRelease={() => setCanScroll(true)}
                  ></Draggable>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 20,
            // height: 200,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              White Basic T-Shirt
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              $99.99
            </Text>
          </View>

          <Text style={{ marginVertical: 20 }}>Colors</Text>

          <View style={{ flexDirection: "row" }}>
            {DATA.map((color, index) => {
              const inputRange = [
                (index - 2) * imageW,
                (index - 1) * imageW,
                index * imageW,
              ];

              const borderWidth = scrollX.interpolate({
                inputRange,
                outputRange: [0, 2, 0],
              });

              if (!color.color) {
                return <></>;
              }

              return (
                <Animated.View
                  key={color.color}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: color.color,
                    marginRight: 5,
                    borderWidth,
                    borderColor: "#000",
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          top: -130,
          left: -10,
          width: "105%",
          height: 380,
          borderRadius: 600,
          borderColor: "#ccc",
          borderWidth: 8,
        }}
      />
    </View>
  );
}
