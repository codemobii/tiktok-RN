import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomTabs from "./apps/BottomTabs";
import Clothline from "./apps/Clothline";
import EmojiApp from "./apps/EmojiApp";
import JerseyApp from "./apps/JerseyApp";
import MovieApp from "./apps/MovieApp";
import MovieApp2 from "./apps/MovieApp2";
import NightAndDay from "./apps/NightAndDay";
import WhotGame from "./apps/whot";
import SelectArtist from "./apps/SelectArtist";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
} from "@expo-google-fonts/work-sans";
import EnterPassword from "./apps/EnterPassword";

export default function App() {
  let [fontsLoaded] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Clothline />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
