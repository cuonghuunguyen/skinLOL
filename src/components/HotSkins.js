import React, {Component} from 'react';
import {View, StyleSheet, BackHandler, Alert} from 'react-native';
import ListVideo from './ListVideo';
import {connect} from 'react-redux';
import {colors} from '../constant/colors';

class HotSkins extends Component {
  constructor (props) {
    super (props);
  }

  static navigationOptions = {
    tabBarLabel: 'Hot Skins',
  };
  componentDidMount () {
    BackHandler.addEventListener ('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener ('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    Alert.alert (
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp ()},
      ],
      {cancelable: false}
    );
    return true;
  };
  render () {
    return (
      <View style={styles.container}>
        <ListVideo
          data={this.props.listSkin.filter (skin => skin.isHot)}
          fetchStatus={this.props.fetchStatus}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.backgroundColorVideo,
  },
});

const mapStateToProps = state => ({
  listSkin: state.listSkin,
  fetchStatus: state.skinFetchStatus,
});

export default connect (mapStateToProps) (HotSkins);
