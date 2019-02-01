import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { colors } from "../../constant/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Constants } from "../../constant/Constants";
import StyleConstants from "../../constant/StyleConstants";
import ImageConstants from "../../constant/ImageConstants";
import GridList from "react-native-grid-list";

export default class ListRolePlayModal extends Component {
  constructor(props) {
    super(props);
  }

  listRolePlay = Constants.LIST_ROLE_PLAY;

  onPressItem = roleKey => {
    this.props.handleChangeKeyWord({
      roleKey
    });
    this.props.closeModal();
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item.key)}>
        <View style={[styles.itemBox, StyleConstants.BODER_COLORS[index]]}>
          <Image
            source={ImageConstants.ROLE_PLAY[index]}
            style={styles.avatar}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Choose Role Play</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.closeModal();
              }}
            >
              <Icon name="close" color={colors.headerTintColor} size={26} />
            </TouchableOpacity>
          </View>
          <GridList
            showSeparator={true}
            separatorBorderWidth={10}
            data={this.listRolePlay}
            numColumns={2}
            renderItem={this._renderItem}
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
  itemBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 16
  },
  avatar: {
    height: 60,
    width: 60
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary
  }
});
