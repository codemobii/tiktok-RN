import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import StarRating from "react-native-star-rating";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SCREEN_HEIGHT = Dimensions.get("window").height;

const xOffset = new Animated.Value(0);

const transitionAnimation = (index) => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [0.75, 1, 0.75],
        }),
      },
      {
        translateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [100, 0, 100],
        }),
      },
    ],
  };
};

const backgroundImageAnimation = (index) => {
  return {
    opacity: xOffset.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0, 1, 0],
    }),
  };
};

const MovieCard = ({ item = {}, index }) => {
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 50,
        overflow: "hidden",
      }}
    >
      <Animated.Image
        source={{
          uri: "http://image.tmdb.org/t/p/w500/" + item?.backdrop_path,
        }}
        style={[
          {
            height: SCREEN_HEIGHT / 2,
            width: SCREEN_WIDTH,
            position: "absolute",
            top: 0,
            left: 0,
          },
          backgroundImageAnimation(index),
        ]}
      />

      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "white"]}
        style={[
          {
            height: SCREEN_HEIGHT / 2,
            width: SCREEN_WIDTH,
            position: "absolute",
            top: 0,
            left: 0,
          },
        ]}
      />

      <Animated.View
        style={[
          {
            position: "relative",
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: 20,
            alignItems: "center",
          },
          transitionAnimation(index),
        ]}
      >
        <Image
          source={{
            uri: "http://image.tmdb.org/t/p/w500/" + item?.poster_path,
          }}
          style={{
            width: "100%",
            height: 350,
            borderRadius: 30,
            overflow: "hidden",
            resizeMode: "cover",
          }}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 20,
          }}
          numberOfLines={1}
        >
          {item?.title} ({item?.release_date?.split("-")[0]})
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

        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 100,
            backgroundColor: "#333",
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
      </Animated.View>
    </View>
  );
};

export default function MovieApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const DATA = data || [];
  DATA.length = data.length > 3 ? 3 : data.length;

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=979a1b1af2b6209463f2ab8f77a606b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    );
    const json = await response.json();
    setData(json.results);
    console.log(json);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        renderItem={({ item, index }) => {
          return <MovieCard item={item} index={index} />;
        }}
        keyExtractor={(item) => item?.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        style={{ flex: 1, backgroundColor: "#fff" }}
      />
    </>
  );
}
