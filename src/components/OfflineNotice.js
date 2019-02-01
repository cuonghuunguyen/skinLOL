import React, { PureComponent } from "react";
import { View, Text, NetInfo, Dimensions, StyleSheet } from "react-native";
import { colors } from "../constant/colors";
const { width } = Dimensions.get("window");

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

let isConnectedFirst;

NetInfo.isConnected.fetch().then(isConnected => {
  isConnectedFirst = isConnected;
});

class OfflineNotice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: isConnectedFirst
    };
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnecttivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnecttivityChange
    );
  }
  handleConnecttivityChange = isConnected => {
    if (isConnected) {
      this.setState({
        isConnected
      });
    } else {
      this.setState({
        isConnected
      });
    }
  };

  render() {
    var { isConnected } = this.state;
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: colors.activeRedColor,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    top: 100
  },
  offlineText: {
    color: colors.headerTintColor
  }
});
export default OfflineNotice;
