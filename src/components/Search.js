import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import Search from 'react-native-search-box';
import {colors} from '../constant/colors';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {connect} from 'react-redux';
const fuzzy = require ('fuzzysearch');

class SearchBar extends React.PureComponent {
  resultRowHeight = 40;
  styles = StyleSheet.create ({
    searchBox: {
      flexGrow: 0.2,
    },
    searchResults: {
      flexGrow: 0.8,
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
    },
    searchResult: {
      height: this.resultRowHeight,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'center',
    },
    searchIcon: {
      height: this.resultRowHeight * 0.7,
      resizeMode: 'contain',
    },
    searchText: {
      fontSize: 13,
      paddingLeft: 10,
    },
  });

  constructor (props) {
    super (props);
    this.state = {
      searchData: [],
      searchString: '',
    };
  }

  renderResult = searchResult => {
    let key = searchResult.name;
    return (
      <TouchableOpacity
        key={key}
        style={this.styles.searchResult}
        onPress={() => this.handleItemSearch (searchResult)}
      >
        <Image
          source={require ('./../../assets/icons/search.png')}
          style={this.styles.searchIcon}
        />
        <Text style={this.styles.searchText}>{searchResult.name}</Text>
      </TouchableOpacity>
    );
  };

  handleChangeText = async keyword => {
    let numberOfResults = 0;
    this.setState ({
      searchString: keyword,
    });
    let searchData = this.props.data.filter (skin => {
      if (
        numberOfResults > 4 ||
        !fuzzy (keyword.toLowerCase (), skin.name.toLowerCase ())
      )
        return false;

      numberOfResults++;
      return true;
    });
    this.setState ({
      searchData,
    });
  };

  handleSearch = () => {
    this.props.navigation.navigate ('SearchPage', {
      searchString: this.state.searchString,
    });
    this.props.handleClose ();
  };

  handleCancel = async () => {
    this.setState ({
      searchData: [],
    });
    this.props.handleClose ();
  };

  handleItemSearch = searchResult => {
    this.props.navigation.navigate ('PlayVideo', {
      videoInfo: searchResult,
    });
    this.props.handleClose ();
  };
  render () {
    return (
      <View>
        <Search
          ref="search_box"
          backgroundColor="black"
          style={this.styles.searchBox}
          onChangeText={this.handleChangeText}
          onCancel={this.handleCancel}
          onSearch={this.handleSearch}
        />

        <View style={this.styles.searchResults}>
          {this.state.searchData.map (searchResult =>
            this.renderResult (searchResult)
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.listSkin,
});

const SearchBarWithRedux = connect (mapStateToProps) (SearchBar);

export default class SearchBox extends React.Component {
  constructor () {
    super ();
    this.state = {
      isVisible: false,
    };
  }

  handleClose () {
    this.setState ({
      isVisible: false,
    });
  }

  handleOpen () {
    // handle for transfer to search page
    this.setState ({
      isVisible: true,
    });
  }

  // handle for transfer to search page
  render () {
    let {navigation} = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.handleOpen ();
          }}
        >
          <Icon name="search1" color={colors.iconSearchColor} size={30} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.handleClose ();
          }}
        >
          <View>
            <SearchBarWithRedux
              handleClose={this.handleClose.bind (this)}
              navigation={navigation}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
