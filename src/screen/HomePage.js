import {createMaterialTopTabNavigator} from 'react-navigation';
import HotSkins from '../components/HotSkins';
import NewSkins from '../components/NewSkins';
import {colors} from '../constant/colors';
export const Tabs = createMaterialTopTabNavigator (
  {
    HotSkins: HotSkins,
    NewSkins: NewSkins,
  },
  {
    tabBarOptions: {
      activeTintColor: colors.activeRedColor,
      inactiveTintColor: colors.initRedColore,
      upperCaseLabel: true,
      indicatorStyle: {
        backgroundColor: colors.activeRedColor,
      },
      labelStyle: {
        fontWeight: 'bold',
      },
      style: {
        backgroundColor: colors.primary,
      },
    },
  }
);
