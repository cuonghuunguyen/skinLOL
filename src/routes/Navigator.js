import React from "react";
import SearchPage from "../screen/SearchPage";
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerActions,
  DrawerItems
} from "react-navigation";
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  Linking,
  StyleSheet
} from "react-native";
import { Tabs } from "../screen/HomePage";
import { colors } from "../constant/colors";
import SearchBox from "../components/Search";
import { ScrollView } from "react-native-gesture-handler";
import PlayVideo from "../screen/PlayVideo";
import { fetchChampionList, fetchSkinList } from "../actions/actions";
import { connect } from "react-redux";

const styles = {
  CustomeDrawerComponent: StyleSheet.create({
    container: {
      flex: 1
    }
  }),
  view: {
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  DrawerNavigator: StyleSheet.create({
    sizeTabImage: {
      height: 24,
      width: 24
    }
  }),
  MenuImage: StyleSheet.create({
    menuImage: {
      height: 20,
      width: 20
    }
  })
};

const CustomeDrawerComponent = props => (
  <SafeAreaView style={styles.CustomeDrawerComponent.container}>
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={require("../../assets/images/zombie.gif")}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require("../../assets/icons/home.png")}
            style={styles.DrawerNavigator.sizeTabImage}
          />
        )
      }
    },
    Champions: {
      screen: props => <SearchPage {...props} keyModal={"Champions"} />,
      navigationOptions: {
        drawerIcon: <Image source={require("../../assets/icons/Champs.png")} />
      }
    },
    Tiers: {
      screen: props => <SearchPage {...props} keyModal={"Tiers"} />,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require("../../assets/icons/skin.png")}
            style={styles.DrawerNavigator.sizeTabImage}
          />
        ),
        title: "Tier Skins"
      }
    },
    Roles: {
      screen: props => <SearchPage {...props} keyModal={"Roles"} />,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require("../../assets/icons/Slayer_icon.png")}
            style={styles.DrawerNavigator.sizeTabImage}
          />
        )
      }
    }
  },
  {
    contentComponent: CustomeDrawerComponent,
    initialRouteName: "Home",
    drawerWidth: 250,
    contentOptions: {
      activeTintColor: colors.activeRedColor,
      inactiveTintColor: colors.initRedColore,
      activeBackgroundColor: colors.primary
    },
    drawerBackgroundColor: colors.drawerBackgroundColor
  }
);

class DrawerNavigatorCustomize extends DrawerNavigator {
  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    const { navigate } = this.props.navigation;
    let videoID = url.substring(19);

    navigate("PlayVideo", { videoID });
  };
}

const MenuImage = ({ navigation }) => {
  if (!navigation.state.isDrawerOpen) {
    return <Image source={require("../../assets/icons/menu-button.png")} />;
  } else {
    return (
      <Image
        source={require("../../assets/icons/close1.png")}
        style={styles.MenuImage.menuImage}
      />
    );
  }
};
const StackNavigator = createStackNavigator(
  {
    PlayVideo: {
      screen: PlayVideo
    },
    DrawerNavigator: {
      screen: DrawerNavigatorCustomize
    },
    SearchPage: {
      screen: SearchPage
    }
  },
  {
    initialRouteName: "DrawerNavigator",
    navigationOptions: ({ navigation }) => ({
      title: "LOL Skins",
      headerLeft:
        navigation.state.routeName === "DrawerNavigator" ? (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          >
            <MenuImage navigation={navigation} />
          </TouchableOpacity>
        ) : (
          ""
        ),
      headerStyle: {
        backgroundColor: colors.primary,
        paddingLeft: 10,
        paddingRight: 10
      },
      headerTintColor: colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight:
        navigation.state.routeName === "DrawerNavigator" ? (
          <SearchBox navigation={navigation} />
        ) : (
          ""
        )
    })
  }
);

class StackNavigatorCustomized extends StackNavigator {
  componentDidMount() {
    this.props.fetchSkinList();
    this.props.fetchChampionList();
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSkinList: () => dispatch(fetchSkinList()),
  fetchChampionList: () => dispatch(fetchChampionList())
});

export default connect(
  null,
  mapDispatchToProps
)(StackNavigatorCustomized);
