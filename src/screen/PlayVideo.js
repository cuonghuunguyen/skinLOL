import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  BackHandler,
  FlatList
} from "react-native";
import YouTube from "react-native-youtube";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../constant/colors";
import { connect } from "react-redux";
import ListVideoItem from "../components/ListVideoItem";

class PlayVideo extends Component {
  static navigationOptions = ({ navigation }) => {
    onShare = () => {
      const itemId = navigation.getParam("videoID");
      const content = {
        message: "http://zombieteam.tk/" + itemId,
        title: "share"
      };
      Share.share(content);
    };
    return {
      title: navigation.getParam("videoInfo").name,
      headerStyle: {
        backgroundColor: "black",
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: -5
      },
      headerTitleStyle: {
        marginLeft: -5
      },
      headerRight: (
        <TouchableOpacity onPress={() => this.onShare()}>
          <View style={styles.shareButtonBox}>
            <View>
              <Icon name="share" color={colors.iconSearchColor} size={33} />
            </View>
          </View>
        </TouchableOpacity>
      )
    };
  };
  state = {
    isPlaying: true
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  onSelfShare = () => {
    const itemId = this.props.navigation.getParam("vide");
    const content = {
      message: "https://zombie.com/" + itemId,
      title: "share"
    };
    Share.share(content);
  };

  _renderHeader = videoInfo => {
    return (
      <View>
        <Text style={styles.relatedVideosTitle}>{videoInfo.name}</Text>
        <View style={styles.videoDetailBar}>
          <View style={styles.videoDetailItem}>
            <View style={styles.iconBox}>
              <Icon name="fire" color={colors.shareIconColor} size={30} />
            </View>
            <Text style={styles.videoDetailTextInfo}>{videoInfo.roleType}</Text>
          </View>
          <View style={styles.videoDetailItem}>
            <View style={styles.iconBox}>
              <Icon name="trophy" color={colors.shareIconColor} size={30} />
            </View>
            <Text style={styles.videoDetailTextInfo}>{videoInfo.tierType}</Text>
          </View>
          <View style={styles.videoDetailItem}>
            <View style={styles.iconBox}>
              <Icon name="cash" color={colors.shareIconColor} size={33} />
            </View>
            <Text style={styles.videoDetailTextInfo}>{videoInfo.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.videoDetailItem}
            onPress={() => this.onSelfShare()}
          >
            <View style={styles.iconBox}>
              <Icon name="share" color={colors.shareIconColor} size={30} />
            </View>
            <Text style={styles.videoDetailTextInfo}>Share</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.relatedVideosTitle}>Related Videos: </Text>
      </View>
    );
  };

  render() {
    let videoInfo = null;
    videoInfo = this.props.navigation.getParam("videoInfo");
    let videoID = videoInfo.id ? videoInfo.id : "Z4oIrPyAbaw";
    return (
      <View style={styles.container}>
        <YouTube
          apiKey="AIzaSyBuoKtHBIpcyUtAW-skH4Y9R6cu__i23Ys"
          controls={1}
          videoId={videoID} // The YouTube 4 ID
          play={true} // control playback of video with true/false
          fullscreen={true} // control whether the video should play in fullscreen or inline
          style={styles.youtubePlayer}
        />
        <View style={styles.relatedVideos}>
          <FlatList
            data={this.props.listSkin.filter(
              skin => skin.roleType == videoInfo.roleType
            )}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this._renderHeader(videoInfo)}
            renderItem={({ item }) => {
              return (
                <ListVideoItem
                  isPlayerScreen={true}
                  item={item}
                  navigation={this.props.navigation}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorVideo
  },
  videoTitleBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingHorizontal: 10,
    height: 50
  },
  youtubePlayer: {
    alignSelf: "stretch",
    backgroundColor: "black",
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9
  },
  videoTitle: {
    flex: 5,
    fontSize: 18,
    color: "black",
    marginRight: 10
  },
  shareButtonBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 10
  },
  videoDetailBar: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingBottom: 5
  },
  videoDetailItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
  },
  videoDetailTextInfo: {
    textAlign: "center"
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "center"
  },
  relatedVideos: {
    flex: 2
  },
  relatedVideosTitle: {
    paddingTop: 8,
    paddingLeft: 10,
    paddingBottom: 3,
    fontSize: 17,
    fontWeight: "bold",
    color: "#555"
  },
  shareTitle: {
    color: "red"
  },
  itemSeparator: {
    height: 1,
    flex: 1,
    backgroundColor: colors.borderColor
  }
});

const mapStateToProps = state => ({
  listSkin: state.listSkin,
  fetchStatus: state.skinFetchStatus
});

export default connect(mapStateToProps)(PlayVideo);
