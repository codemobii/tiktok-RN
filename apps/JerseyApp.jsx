import {
  View,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SvgUri } from "react-native-svg";

const DATA = [
  "https://static.wixstatic.com/media/2f4239_508f178bd3bc490ba611d0b019505e82~mv2.gif",
  "https://static.wixstatic.com/media/2f4239_13842b1be829460fa8169046dc714fbd~mv2.gif",
  "https://static.wixstatic.com/media/2f4239_1a1942c84ef24a6aaba06b94849f9c2f~mv2.gif",
];

const THUMB_DATA = [
  "https://o.remove.bg/downloads/81d8bc3c-fcf9-452c-9849-7a50a60312c3/image-removebg-preview.png",
  "https://o.remove.bg/downloads/bc52a969-97d3-4f20-9a22-5d4e60c158f1/image-removebg-preview.png",
  "https://o.remove.bg/downloads/3a39c020-bdc3-4337-87c2-3b4349ed19b1/image-removebg-preview.png",
];

export default function JerseyApp() {
  const { width, height } = Dimensions.get("screen");
  const xOffset = new Animated.Value(0);

  const transitionAnimation = (index) => {
    return {
      transform: [
        { perspective: 800 },
        {
          scale: xOffset.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.2, 1, 0.2],
          }),
        },
      ],
    };
  };

  const bgRef = React.useRef();
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sport-1-Logo%2C_2013.svg/1992px-Sport-1-Logo%2C_2013.svg.png",
          }}
          style={{ width: 150, height: 50, resizeMode: "contain" }}
        />
      </View>

      <Animated.FlatList
        ref={bgRef}
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const page = Math.floor(offsetX / width);
          setActiveIndex(page);
        }}
        data={DATA}
        keyExtractor={(e, i) => i}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              { width, height: height * 0.6 },
              transitionAnimation(index),
            ]}
          >
            <Image
              source={{ uri: item }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </Animated.View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: false }
        )}
      />

      <Animated.FlatList
        data={THUMB_DATA}
        keyExtractor={(e, i) => i}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              width: 100,
              height: 150,
              transform: [
                {
                  scale: xOffset.interpolate({
                    inputRange: [
                      (index - 1) * width,
                      index * width,
                      (index + 1) * width,
                    ],
                    outputRange: [0.8, 1.2, 0.8],
                  }),
                },
              ],
            }}
          >
            <Image
              source={{ uri: item }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </Animated.View>
        )}
        contentContainerStyle={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      />
    </SafeAreaView>
  );
}
