import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListVideoItem from '../components/ListVideoItem';
import ListChampionsModal from '../components/modals/ListChampionsModal';
import ListSkinTiersModal from '../components/modals/ListSkinTiersModal';
import ListRolePlayModal from '../components/modals/ListRolePlayModal';
import {colors} from '../constant/colors';

import {connect} from 'react-redux';
const fuzzy = require ('fuzzysearch');

class SearchPage extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primary,
      paddingLeft: 0,
      paddingRight: 0,
    },
  };
  constructor (props) {
    super (props);
    this.state = {
      textSearch: '',
      championKey: '',
      tierKey: '',
      roleKey: '',
      searchData: this.props.listSkin ? this.props.listSkin : [],
      isOpenListChampionsModal: false,
      isOpenListSkinTiersModal: false,
      isOpenListRolePlayModal: false,
    };
  }

  componentDidMount () {
    this.getStatesFromNavigation ();
    BackHandler.addEventListener ('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount () {
    BackHandler.removeEventListener ('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate ('Home');
    return true;
  };
  getStatesFromNavigation = () => {
    const {navigation} = this.props;
    this.setState ({
      textSearch: navigation.getParam ('searchString', ''),
    });
    const keyModal = this.props.keyModal;
    this.openModal (keyModal);
  };

  openModal = modalType => {
    switch (modalType) {
      case 'Champions':
        this.setState ({isOpenListChampionsModal: true});
        break;
      case 'Tiers':
        this.setState ({isOpenListSkinTiersModal: true});
        break;
      case 'Roles':
        this.setState ({isOpenListRolePlayModal: true});
        break;
    }
  };

  closeModal = () => {
    this.setState ({
      isOpenListChampionsModal: false,
      isOpenListSkinTiersModal: false,
      isOpenListRolePlayModal: false,
    });
  };

  handleChangeKeyWord (newKeyWord) {
    const newState = {...this.state, ...newKeyWord};
    const newSearchData = this.props.listSkin.filter (skin => {
      if (
        !fuzzy (newState.textSearch.toLowerCase (), skin.name.toLowerCase ()) ||
        !skin.champion
          .toLowerCase ()
          .includes (newState.championKey.toLowerCase ()) ||
        !skin.roleType
          .toLowerCase ()
          .includes (newState.roleKey.toLowerCase ()) ||
        !skin.tierType.toLowerCase ().includes (newState.tierKey.toLowerCase ())
      )
        return false;
      return true;
    });
    this.setState ({...newState, searchData: newSearchData});
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <KeyboardAwareScrollView>
            <View style={styles.container}>
              <TextInput
                placeholder="Search"
                style={styles.searchInput}
                onChangeText={textSearch =>
                  this.handleChangeKeyWord ({textSearch})}
                value={this.state.textSearch}
              />
              <View style={styles.searchArea}>
                <View style={styles.searchItem}>
                  <Text style={styles.item_title}>Champion:</Text>
                  <View style={styles.textInputArea}>
                    <TouchableOpacity
                      style={styles.textInputTouchable}
                      onPress={() => this.openModal ('Champions')}
                    >
                      <TextInput
                        style={styles.textInput}
                        editable={false}
                        value={this.state.championKey}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.clearFilter}
                      onPress={() =>
                        this.handleChangeKeyWord ({championKey: ''})}
                    >
                      <Icon
                        name="close-circle"
                        color={colors.closeButtonColor}
                        size={27}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.searchItem}>
                  <Text style={styles.item_title}>Tier:</Text>
                  <View style={styles.textInputArea}>
                    <TouchableOpacity
                      style={styles.textInputTouchable}
                      onPress={() => this.openModal ('Tiers')}
                    >
                      <TextInput
                        style={styles.textInput}
                        editable={false}
                        value={this.state.tierKey}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.clearFilter}
                      onPress={() => this.handleChangeKeyWord ({tierKey: ''})}
                    >
                      <Icon
                        name="close-circle"
                        color={colors.closeButtonColor}
                        size={27}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.searchItem}>
                  <Text style={styles.item_title}>Role:</Text>
                  <View style={styles.textInputArea}>
                    <TouchableOpacity
                      style={styles.textInputTouchable}
                      onPress={() => this.openModal ('Roles')}
                    >
                      <TextInput
                        style={styles.textInput}
                        editable={false}
                        value={this.state.roleKey}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.clearFilter}
                      onPress={() => this.handleChangeKeyWord ({roleKey: ''})}
                    >
                      <Icon
                        name="close-circle"
                        color={colors.closeButtonColor}
                        size={27}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.listVideos}>
          <FlatList
            data={this.state.searchData}
            keyExtractor={(item, index) => index.toString ()}
            renderItem={({item}) => {
              return (
                <ListVideoItem item={item} navigation={this.props.navigation} />
              );
            }}
          />
        </View>
        <View style={styles.modalArea}>
          <ListChampionsModal
            handleChangeKeyWord={this.handleChangeKeyWord.bind (this)}
            openModal={this.state.isOpenListChampionsModal}
            closeModal={this.closeModal}
          />
          <ListSkinTiersModal
            handleChangeKeyWord={this.handleChangeKeyWord.bind (this)}
            openModal={this.state.isOpenListSkinTiersModal}
            closeModal={this.closeModal}
          />
          <ListRolePlayModal
            handleChangeKeyWord={this.handleChangeKeyWord.bind (this)}
            openModal={this.state.isOpenListRolePlayModal}
            closeModal={this.closeModal}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listSkin: state.listSkin,
});

export default connect (mapStateToProps) (SearchPage);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  view: {
    marginBottom: 5,
  },
  searchArea: {
    flex: 1,
  },
  searchItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 3,
  },
  item_title: {
    flex: 5,
    fontSize: 18,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 3,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
  },
  textInputArea: {
    flex: 11,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 17,
  },
  textInputTouchable: {
    flex: 7,
    paddingLeft: 5,
  },
  textInput: {
    flex: 1,
    padding: 5,
    height: 30,
    fontSize: 15,
    color: colors.searchPageTextInput,
  },
  clearFilter: {
    flex: 1,
  },
  listVideos: {
    flex: 4,
    flexDirection: 'column',
  },
  modalArea: {
    flex: 0,
  },
});
