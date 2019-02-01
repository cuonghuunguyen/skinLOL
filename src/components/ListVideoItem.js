import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import VideoModal from './VideoModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constant/colors';

export default class ListVideoItem extends Component {
  constructor (props) {
    super (props);
    this.state = {
      modalVisible: false,
    };
  }

  onOpenPreviewItem = () => {
    this.setState ({modalVisible: true});
  };

  onClosePreviewItem = () => {
    this.setState ({modalVisible: false});
  };

  onClickVideoItem = item => {
    this.props.navigation.navigate ('PlayVideo', {
      videoInfo: item,
    });
  };
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => this.onClickVideoItem (this.props.item)}
          >
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {this.props.item.name}
            </Text>
            <Text style={styles.textDetail}>
              Role: {this.props.item.roleType}
            </Text>
            <Text style={styles.textDetail}>
              Type: {this.props.item.tierType}
            </Text>
            <Text style={styles.textDetail}>
              Price: {this.props.item.price} RP
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.isPlayerScreen
              ? this.onClickVideoItem (this.props.item)
              : this.onOpenPreviewItem ()}
          style={styles.imgContainer}
        >
          <View style={styles.videoThumbnail}>
            <Image
              resizeMode={'stretch'}
              style={styles.img}
              source={{uri: this.props.item.image}}
            />
            <View style={styles.playIconBox}>
              <Icon
                name="play-circle-outline"
                color={colors.playIconColor}
                size={50}
              />
            </View>
          </View>
        </TouchableOpacity>
        {this.state.modalVisible
          ? <VideoModal
              item={this.props.item}
              modalVisible={this.state.modalVisible}
              close={this.onClosePreviewItem}
            />
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  imgContainer: {
    flex: 4,
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 10,
  },
  infoContainer: {
    flex: 7,
  },
  title: {
    marginTop: -5,
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDetail: {
    paddingTop: 1.5,
    paddingBottom: 0,
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shareTitle: {
    marginLeft: 5,
    color: colors.shareIconColor,
  },
  videoThumbnail: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconBox: {
    position: 'absolute',
  },
});
