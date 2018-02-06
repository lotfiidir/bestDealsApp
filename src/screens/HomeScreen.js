import React, {Component} from 'react';
import {Button} from 'react-native';
import {ApolloProvider} from 'react-apollo';

import client from "../client";
import ListPage from "../components/ListPage"
import Deals from "../components/Deals"


export default class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home'

    };

    render() {
        return (
            <Deals/>
        );
    }
}
/*
 <Button
                title="List of deals"
                onPress={() =>
                    navigate('Detail', { name: 'Jane' })
                }
            />
*/
