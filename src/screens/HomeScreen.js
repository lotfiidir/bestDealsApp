import React, {Component} from 'react';
import {Button} from 'react-native';
import {ApolloProvider} from 'react-apollo';

import client from "../client";
import ListPage from "../components/ListPage"


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Best deals',
        tabBarLabel: 'Home'

    };

    render() {
        const {navigate} = this.props.navigation;
        console.log(navigate);
        return (
            <ApolloProvider client={client}>
                <ListPage/>
            </ApolloProvider>
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
