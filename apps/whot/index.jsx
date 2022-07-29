import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  CARDS_CIRCLES,
  CARDS_CROSSES,
  CARDS_SQUARES,
  CARDS_STARS,
  CARDS_TRIANGLES,
} from "./cards";
import Player from "./player";

export default function WhotGame() {
  const [CARDS, setCARDS] = useState([
    ...CARDS_CIRCLES,
    ...CARDS_CROSSES,
    ...CARDS_SQUARES,
    ...CARDS_STARS,
    ...CARDS_TRIANGLES,
  ]);

  const [PLAYER_ONE_CARDS, setPLAYER_ONE_CARDS] = useState([1, 1, 1, 1]);

  const [PLAYER_TWO_CARDS, setPLAYER_TWO_CARDS] = useState([1, 1, 1, 1]);

  const [CURRENT_PLAYER, setCURRENT_PLAYER] = useState(1);

  const [CURRENT_CARD, setCURRENT_CARD] = useState(null);

  const [PLAYED_CARDS, setPLAYED_CARDS] = useState([]);

  const [disabled, setDisabled] = useState(2);

  const [PENALTY_PASSED, setPENALTY_PASSED] = useState(true);

  const [NUMBER_OF_CARDS_TO_PICK, setNUMBER_OF_CARDS_TO_PICK] = useState(1);

  const [PENALTY_NOTE, setPENALTY_NOTE] = useState("");

  const initGAME = () => {
    // randomly pick items from CARDS and set to PLAYER_ONE_CARDS
    // remove PLAYER_ONE_CARDS from CARDS
  };

  const handlePenaltyCheck = (card) => {
    if (card.value === 2) {
      setNUMBER_OF_CARDS_TO_PICK(2);
      alert(`PICK TWO`);
      setPENALTY_NOTE("PICK TWO");
      setPENALTY_PASSED(false);
    } else if (card.value === 14) {
      setNUMBER_OF_CARDS_TO_PICK(1);
      alert("GENRAL MARKET");
      setPENALTY_NOTE("GENERAL MARKET");
      setPENALTY_PASSED(false);
    }
  };

  const handlePlayerOne = (card) => {
    setDisabled(true);
    if (!CURRENT_CARD) {
      // remove card from current player and add to PLAYED cards and remove from current player  cards
      if (CURRENT_PLAYER === 1) {
        // setPLAYER_ONE_CARDS
        setCURRENT_PLAYER(2);
        setCURRENT_CARD(card);
      } else {
        // setPLAYER_TWO_CARDS
        setCURRENT_PLAYER(1);
        setCURRENT_CARD(card);
      }
    } else {
      if (
        card.name !== CURRENT_CARD.name ||
        card.value !== CURRENT_CARD.value
      ) {
        alert("Card does not match");
      } else {
        // remove card from current player and add to PLAYED cards and remove from current player  cards
        if (CURRENT_PLAYER === 1) {
          // setPLAYER_ONE_CARDS
          setCURRENT_PLAYER(2);
          setCURRENT_CARD(card);
        } else {
          // setPLAYER_TWO_CARDS
          setCURRENT_PLAYER(1);
          setCURRENT_CARD(card);
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Player name="Player ONE" isReal={false} cards={PLAYER_ONE_CARDS} />

        <Player name="Player TWO" isReal={true} cards={PLAYER_TWO_CARDS} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});
