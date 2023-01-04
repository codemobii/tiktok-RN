import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { fonts } from "../utils/fonts";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

export default function SelectArtist() {
  const data = require("../assets/jsons/artisit.json");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const ShuffleData = () => {
    setLoading(true);

    setTimeout(() => {
      //   shuffle array
      const shuffled = data.sort(() => 0.5 - Math.random());
      //   get sub-array of first n elements after shuffled
      let selected = shuffled.slice(0, 9);
      setArtists(selected);

      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    ShuffleData();
  }, []);

  // zoom in animation
  const zoomIn = {
    0: {
      opacity: 0,
      scale: 0.5,
    },
    0.5: {
      opacity: 1,
      scale: 1.2,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        numColumns={3}
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Animatable.View
              animation={"zoomIn"}
              duration={500}
              delay={index * 100}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => {
                  const newSelected = [...selected];
                  if (newSelected.includes(item.id)) {
                    newSelected.splice(newSelected.indexOf(item.id), 1);
                  } else {
                    newSelected.push(item.id);
                  }
                  setSelected(newSelected);
                }}
              >
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                      backgroundColor: "#000",
                    }}
                  />

                  {selected.includes(item.id) && (
                    <Animatable.View
                      animation={"fadeIn"}
                      duration={500}
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="checkmark" size={32} color="#fff" />
                    </Animatable.View>
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.semiBold,
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
      />
      <Footer loading={loading} ShuffleData={ShuffleData} />
    </View>
  );
}

const Header = () => {
  return (
    <View
      style={{ paddingVertical: 40, paddingTop: 80, paddingHorizontal: 40 }}
    >
      <StatusBar hidden translucent />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 0.7,
            height: 1,
            backgroundColor: "#000",
            marginRight: 20,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.semiBold,
            textDecorationLine: "underline",
          }}
        >
          Skip
        </Text>
      </View>

      <Text
        style={{
          fontSize: 40,
          fontFamily: fonts.bold,
          textAlign: "center",
          marginTop: 60,
          lineHeight: 40,
        }}
      >
        Select your favourite artists
      </Text>
      <Text
        style={{
          fontFamily: fonts.regular,
          textAlign: "center",
          fontSize: 16,
          marginTop: 10,
        }}
      >
        We will recommend you songs based on your selections.
      </Text>
    </View>
  );
};

const Footer = ({ ShuffleData, loading = false }) => {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#000",
          borderRadius: 100,
        }}
        onPress={ShuffleData}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.semiBold,
              color: "#fff",
            }}
          >
            Shuffle
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
