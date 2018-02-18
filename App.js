import React from 'react'
import {ApolloProvider} from 'react-apollo';
import {createRootNavigator} from "./src/router/router";
import {isSignedIn} from "./src/components/user/auth";

//import {AppNavigator as Router, createRootNavigator} from './src/router/router';
import client from "./src/client";

// AppNavigator component is router for the app

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        isSignedIn()
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))
            .catch(err => alert("An error occurred"));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);

        return (
            <ApolloProvider client={client}>
                <Layout/>
            </ApolloProvider>
        );
    }
}
