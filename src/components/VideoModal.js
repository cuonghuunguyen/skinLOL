import React, { Component } from "react";
import { StyleSheet, Modal, View, Dimensions } from "react-native";
import VideoPlayer from "react-native-video-controls";
import Orientation from "react-native-orientation";

export default class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.player = {};
  }

  setModalVisible = () => {
    this.props.close();
  };

  handleEnterFullscreen = () => {
    Orientation.lockToLandscape();
  };

  handleExitFullscreen = () => {
    Orientation.lockToPortrait();
  };

  handleBack = () => {
    this.setModalVisible();
  };

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.close();
        }}
      >
        <View style={styles.container}>
          <VideoPlayer
            source={{
              uri: this.props.item.url
            }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            autoplay={true}
            onEnterFullscreen={this.handleEnterFullscreen.bind(this)}
            onExitFullscreen={this.handleExitFullscreen.bind(this)}
            onBack={this.handleBack.bind(this)}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
