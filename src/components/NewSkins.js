import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ListVideo from "./ListVideo";
import { connect } from "react-redux";
import { colors } from "../constant/colors";

class NewSkins extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: "New Skins"
  };

  render() {
    return (
      <View style={styles.container}>
        <ListVideo
          data={this.props.listSkin.filter(skin => skin.isNew)}
          fetchStatus={this.props.fetchStatus}
          navigation={this.props.navigation}
        />
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
  }
});

const mapStateToProps = state => ({
  listSkin: state.listSkin,
  fetchStatus: state.skinFetchStatus
});

export default connect(mapStateToProps)(NewSkins);
