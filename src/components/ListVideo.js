import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text
} from "react-native";
import ListVideoItem from "./ListVideoItem";
import { colors } from "../constant/colors";
import fetchStatus from "../constant/fetchStatus";

export default class ListVideo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.fetchStatus === fetchStatus.SKIN_BEING_FETCHED ? (
          <View style={styles.loadingSpinner}>
            <ActivityIndicator
              size="large"
              color={colors.shareIconColor}
              animating
            />
          </View>
        ) : this.props.fetchStatus === fetchStatus.SKIN_FETCHED_SUCCESSFULLY ? (
          <FlatList
            data={this.props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <ListVideoItem item={item} navigation={this.props.navigation} />
              );
            }}
          />
        ) : (
          <Text>Fetching failed</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: colors.backgroundColorVideo
  },
  loadingSpinner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
