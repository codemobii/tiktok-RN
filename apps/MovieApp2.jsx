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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MovieApp2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const DATA = data || [];

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=979a1b1af2b6209463f2ab8f77a606b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    );
    const json = await response.json();
    // setData([...json.results]);
    setData([{ key: "left-spacer" }, ...json.results, { key: "right-spacer" }]);
    console.log(json);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const imageW = width * 0.72;
  const imageH = imageW * 1.65;
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
        {DATA.map((item, index) => {
          const inputRange = [
            (index - 2) * imageW,
            (index - 1) * imageW,
            index * imageW,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1.5, 1, 1.5],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          if (!item.backdrop_path) {
            return null;
          } else {
            return (
              <Animated.View
                key={index}
                style={{
                  width: width,
                  height: height,
                  position: "absolute",
                  opacity,
                  transform: [{ scale }],
                }}
              >
                <Image
                  source={{
                    uri:
                      "http://image.tmdb.org/t/p/w500/" + item?.backdrop_path,
                  }}
                  style={{
                    width,
                    height: height * 0.5,
                  }}
                />

                <LinearGradient
                  colors={["transparent", "white"]}
                  style={[
                    {
                      height: height * 0.5,
                      width,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                  ]}
                />
              </Animated.View>
            );
          }
        })}
      </View>

      <Animated.FlatList
        data={DATA}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 150,
        }}
        snapToInterval={imageW}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * imageW,
            (index - 1) * imageW,
            index * imageW,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          if (!item.poster_path) {
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
                  backgroundColor: "#fff",
                  height: imageH,
                  borderRadius: imageH,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: imageH / 2,
                  elevation: 5,
                  transform: [{ translateY }],
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    padding: spacing * 2,
                    borderRadius: imageH,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        "http://image.tmdb.org/t/p/w500/" + item?.poster_path,
                    }}
                    style={{
                      width: "100%",
                      height: imageH * 0.45,
                      resizeMode: "cover",
                      borderRadius: imageH,
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      textAlign: "center",
                      marginVertical: 20,
                    }}
                  >
                    {item?.title}
                  </Text>

                  <View style={{ width: 130, marginBottom: 20 }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={item.vote_average / 2}
                      starSize={20}
                      fullStarColor="red"
                      emptyStarColor="red"
                    />
                  </View>

                  <ScrollView horizontal>
                    {["Comic", "Fun", "Adventure"].map((item, index) => (
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: "#ccc",
                          paddingHorizontal: 20,
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          height: 40,
                          borderRadius: 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <TouchableOpacity
                    style={{
                      width: "80%",
                      padding: 20,
                      paddingBottom: 30,
                      borderRadius: 100,
                      backgroundColor: "#000",
                      position: "absolute",
                      bottom: -10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      Buy Ticket
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}
