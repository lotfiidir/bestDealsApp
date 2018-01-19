import {StackNavigator, TabNavigator} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import ListPage from "../components/ListPage";
import DetailPage from "../components/DetailPage";
import MapScreen from "../screens/MapScreen";

export const AppNavigator = StackNavigator({
    Home: {
        screen: TabNavigator({
            Home: {
                screen: HomeScreen,
            },
            Map: {
                screen: MapScreen,
            },
        }, {
            tabBarPosition: 'top',
            animationEnabled: true,
            tabBarOptions: {
                activeTintColor: '#e91e63',
            },
        })
    },
    Detail: {
        screen: DetailPage,
    },
});

export const TabNav = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Map: {
        screen: MapScreen,
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});