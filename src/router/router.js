import React from 'react';
import { Platform, StatusBar } from "react-native";
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Map from "../components/Map";
import Deals from "../components/Deals";
import SignUp from "../components/user/SignUp";
import SignIn from "../components/user/SignIn";
import Profile from "../components/user/Profile";
import Authentification from "../components/user/Authentification";


export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In",
        }
    }
});

export const SignedIn = TabNavigator(
    {
        Home: {
            screen: Deals,
            navigationOptions: {
                tabBarLabel: "Accueil",
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="home" iconType='material' size={25} color={tintColor} />
            }
        },
        Map: {
            screen: Map,
            navigationOptions: {
                tabBarLabel: "Carte",
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="map" iconType='material' size={25} color={tintColor} />
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="account-circle" iconType='material' size={25} color={tintColor} />
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            upperCaseLabel: false,
            showIcon: true
        }
    }
);

/*const RouteConfig = {
    Home: {
        screen: Deals,
        navigationOptions: {
            tabBarLabel: 'Accueil',
        },
    },
    Map: {
        screen: Map,
        navigationOptions: {
            tabBarLabel: 'Carte',
        },
    }
};

const TabConfig = {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#eeeeee',
    }
};

export const AppNavigator = TabNavigator(RouteConfig, TabConfig);*/

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

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
