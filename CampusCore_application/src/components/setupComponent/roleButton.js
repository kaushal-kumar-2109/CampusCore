import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

import { lightTheme, darkTheme } from "../../global/theam";

export default function RollButton({ text }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: theme.buttonBackground,
            borderColor: theme.buttonBorder,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme.buttonTextColor,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: 85,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    shadowColor: "#8b8b8b",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 10,
    elevation: 9,
  },

  text: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});