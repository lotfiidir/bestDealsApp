import React from 'react'
import {ApolloProvider} from 'react-apollo';

import {AppNavigator as Router} from './src/router/router';
import client from "./src/client";

// AppNavigator component is router for the app

export default class App extends React.Component {

    render() {
        return (
        <ApolloProvider client={client}>
            <Router/>
        </ApolloProvider>
        );
    }
}