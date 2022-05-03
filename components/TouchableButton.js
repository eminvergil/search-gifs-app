import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { FETCH_LIMIT, SPACING } from "../constant";

export function TouchableButton({
  onPressFunction = null,
  text,
  limit = null,
}) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING,
        marginBottom: SPACING,
      }}
    >
      <TouchableHighlight
        style={{
          height: 40,
          width: 160,
          borderRadius: 10,
          backgroundColor:
            // limit && limit !== 20 && limit < FETCH_LIMIT ? "green" : "gray",
            "green",
          justifyContent: "center",
        }}
        onPress={onPressFunction}
        onDisabled={limit && limit >= FETCH_LIMIT}
      >
        <Text style={{ color: "white", textAlign: "center" }}>{text}</Text>
      </TouchableHighlight>
    </View>
  );
}
