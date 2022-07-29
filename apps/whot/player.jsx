import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function Player({
  cards = [],
  name = "",
  handlePlay,
  isReal = false,
}) {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {cards.map((card, index) =>
          isReal ? (
            <View
              key={index}
              style={{
                width: "40%",
                height: 200,
                borderRadius: 20,
                backgroundColor: "blue",
                marginRight: 20,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Text>Play me</Text>
            </View>
          ) : (
            <View />
          )
        )}
      </ScrollView>
    </View>
  );
}
