import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { colors } from "../constant/colors";

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={{ width: 280, height: 260 }}
            source={require("./../../assets/images/image.png")}
          />
        </View>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("./../../assets/images/zombie.gif")}
        />
        <View style={styles.loading}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("./../../assets/images/ic_loading.gif")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: colors.splashBackGroundColor
  },
  logo: {
    marginBottom: 180
  },
  loading: {
    marginLeft: -15
  }
});
