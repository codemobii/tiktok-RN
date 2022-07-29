import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default class BottomTabs extends React.Component {
  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    xtabThree: 0,
    translateX: new Animated.Value(20),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width / 2),
    translateXTabThree: new Animated.Value(width),
    translateY: new Animated.Value(0),
    translateY1: new Animated.Value(0),
    translateY2: new Animated.Value(0),
    translateY3: new Animated.Value(0),
    currentY: new Animated.Value(0),
  };

  handleSlide = (type, axis) => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateY,
      translateX,
      translateY1,
      currentY,
      translateXTabOne,
      translateXTabTwo,
    } = this.state;

    Animated.parallel([
      Animated.timing(currentY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(translateX, {
          toValue: type,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(translateY, {
            toValue: -30,
            duration: 200,
            useNativeDriver: false,
          }).start();
          Animated.timing(axis, {
            toValue: -30,
            duration: 200,
            useNativeDriver: false,
          }).start();
        });
      }),
    ]);

    this.setState({ currentY: axis });
  };

  render() {
    let {
      xTabOne,
      xTabTwo,
      xtabThree,
      translateX,
      translateY1,
      translateY2,
      translateY3,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY,
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#330128" }}>
        <StatusBar style="light" />
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              paddingBottom: 20,
              paddingTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                width: 70,
                height: 70,
                left: 22,
                bottom: "30%",
                backgroundColor: "#fe4f54",
                borderRadius: 100,
                transform: [
                  {
                    translateX,
                  },
                  {
                    translateY,
                  },
                ],
              }}
            />

            <TouchableOpacity
              style={styles.tabButton}
              onLayout={(event) =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 0 }, () =>
                  this.handleSlide(xTabOne, translateY1)
                )
              }
            >
              <Animated.View
                style={{ transform: [{ translateY: translateY1 }] }}
              >
                <Ionicons
                  name="ios-cube-outline"
                  size={32}
                  color={active === 0 ? "#fff" : "#fe4f54"}
                />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabButton}
              onLayout={(event) =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () =>
                  this.handleSlide(xTabTwo, translateY2)
                )
              }
            >
              <Animated.View
                style={{ transform: [{ translateY: translateY2 }] }}
              >
                <Ionicons
                  name="home-outline"
                  size={32}
                  color={active === 1 ? "#fff" : "#fe4f54"}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabButton}
              onLayout={(event) =>
                this.setState({
                  xtabThree: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 2 }, () =>
                  this.handleSlide(xtabThree, translateY3)
                )
              }
            >
              <Animated.View
                style={{ transform: [{ translateY: translateY3 }] }}
              >
                <Ionicons
                  name="time-outline"
                  size={32}
                  color={active === 2 ? "#fff" : "#fe4f54"}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 70,
    position: "relative",
  },
});
