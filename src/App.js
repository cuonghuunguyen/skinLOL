/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Splash from "./components/Splash";
import Navigator from "./routes/Navigator";
import store from "./store";
import { Provider } from "react-redux";
import OfflineNotice from "./components/OfflineNotice";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  render() {
    return this.state.loading ? (
      <Splash />
    ) : (
      <View style={styles.container}>
        <View style={styles.container}>
          <Provider store={store}>
            <Navigator />
            <OfflineNotice />
          </Provider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
