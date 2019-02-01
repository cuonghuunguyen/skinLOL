import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  View,
  SectionList,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { colors } from "../../constant/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";

class ListChampionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { listChampions: [] };
  }

  componentDidMount() {
    this.getListChampions();
  }

  getListChampions = () => {
    this.setState({ listChampions: this.props.listChampions });
  };

  onPressItem = championKey => {
    this.props.handleChangeKeyWord({
      championKey
    });
    this.props.closeModal();
  };

  _renderHeader = headerItem => {
    return (
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>{headerItem.section.title}</Text>
        <View style={styles.headerLine} />
      </View>
    );
  };

  _renderItem = listItems => {
    return (
      <TouchableHighlight
        underlayColor={colors.underlayColor}
        onPress={() => this.onPressItem(listItems.item.name)}
        delayLongPress={3000}
      >
        <View style={styles.itemSection}>
          <Image
            source={{ uri: listItems.item.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.championName}>{listItems.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.openModal}
        onRequestClose={() => {
          this.props.closeModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalBar}>
            <Text style={styles.modalTitle}>Choose Champion</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.closeModal();
              }}
            >
              <Icon name="close" color={colors.headerTintColor} size={26} />
            </TouchableOpacity>
          </View>
          <SectionList
            sections={this.state.listChampions}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderHeader}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  modalBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.primary
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
    color: colors.headerTintColor
  },
  headerSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 6
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.shareIconColor
  },
  headerLine: {
    flex: 15,
    height: 1,
    backgroundColor: colors.listChampionHearderLineColor
  },
  itemSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5
  },
  avatar: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: colors.redSunset,
    borderRadius: 30
  },
  championName: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.primary
  }
});

const mapStateToProps = state => ({
  listChampions: state.listChampion,
  fetchStatus: state.skinFetchStatus
});

export default connect(mapStateToProps)(ListChampionsModal);
