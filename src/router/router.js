import {StackNavigator, TabNavigator} from 'react-navigation';

//import HomeScreen from "../screens/HomeScreen";
//import ListPage from "../components/ListPage";
//import DetailPage from "../components/DetailPage";
import MapScreen from "../screens/MapScreen";
import Deals from "../components/Deals";

const RouteConfig = {
    Home: {
        screen: Deals,
        navigationOptions: {
            tabBarLabel: 'Accueil',
        },
    },
    Map: {
        screen: MapScreen,
        navigationOptions: {
            tabBarLabel: 'Carte',
        },
    }
};

const TabConfig = {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e9dd61',
    }
};

export const AppNavigator = TabNavigator(RouteConfig, TabConfig);


/*
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
                    activeTintColor: '#e2d7e9',
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
        navigationOptions: {
            title: 'Best deals',
            tabBarLabel: 'Carte',
        },
    },
    Map: {
        screen: MapScreen,
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e9dd61',
    },
});*/
