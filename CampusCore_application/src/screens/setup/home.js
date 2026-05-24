
import React from "react";
import { Text, View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RollButton from "../../components/setupComponent/roleButton";
import { lightTheme, darkTheme } from "../../global/theam";
import { useColorScheme } from "react-native";


const Home = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const windowHeight = Dimensions.get("window").height;

  const handleAdmin = () => {
    navigation.navigate("adminLogin");
  };
  const handleTeacher = () => {
    navigation.navigate("staffLogin");
  };
  const handleStudent = () => {
    navigation.navigate("studentLogin");
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#cfdef3"]}
      style={[styles.gradient, { minHeight: windowHeight }]}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.heading, { color: theme.primary }]}>Welcome to CampusCore</Text>
        <Text style={[styles.subheading, { color: theme.subText }]}>Choose Your Role to Continue</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonPressContainer} onPress={handleAdmin}>
            <RollButton text={"Admin"} />
          </Pressable>
          <Pressable style={styles.buttonPressContainer} onPress={handleTeacher}>
            <RollButton text={"Teacher"} />
          </Pressable>
          <Pressable style={styles.buttonPressContainer} onPress={handleStudent}>
            <RollButton text={"Student"} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export { Home };

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  logoContainer: {
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e0eafc",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 6,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  buttonContainer: {
    width: "100%",
    gap: 18,
  },
  buttonPressContainer: {
    width: "100%",
    alignItems: "center",
  },
});