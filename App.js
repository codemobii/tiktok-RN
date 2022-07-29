import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomTabs from "./apps/BottomTabs";
import JerseyApp from "./apps/JerseyApp";
import MovieApp from "./apps/MovieApp";
import MovieApp2 from "./apps/MovieApp2";
import NightAndDay from "./apps/NightAndDay";
import WhotGame from "./apps/whot";

export default function App() {
  return <MovieApp2 />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
