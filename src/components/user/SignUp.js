import React, {Component} from "react";
import {View} from "react-native";
import {Card, Button, FormLabel, FormInput} from "react-native-elements";
import {onSignIn} from "./auth";
import {auth0} from "./auth-cridentials";
import gql from "graphql-tag";
import {graphql} from "react-apollo";

const createUser = gql`
    mutation ($email: String!, $password: String!, $name: String!){
        createUser(
            name: $name,
            authProvider: {
                email: {
                    email: $email,
                    password: $password
                }
            }
        ) {
            id
        }
    }`;


class SignUp extends Component {
    constructor({props, navigation}) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    _signUp = async () => {
        const {email, password, name} = this.state;
        await this.props.createUser({
            variables: {email, password, name}
        });
    };

    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({name: text})} placeholder="Name..."/>
                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({email: text})} placeholder="Email address..."/>
                    <FormLabel>Password</FormLabel>
                    <FormInput onChangeText={(text) => this.setState({password: text})} secureTextEntry
                               placeholder="Password..."/>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Confirm Password..."/>

                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="SIGN UP"
                        onPress={() => {
                            this._signUp().then(() => {
                                onSignIn().then(() => navigation.navigate("SignedIn"));
                            });

                            /*auth0
                                .webAuth
                                .authorize({scope: 'openid profile', audience: 'https://bestdealsapp.eu.auth0.com/userinfo'})
                                .then(credentials => {
                                    Alert.alert(
                                        'Success',
                                        'AccessToken: ' + credentials.accessToken,
                                        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                        {cancelable: false}
                                    );
                                    this.setState({accessToken: credentials.accessToken});
                                })
                                .catch(error => console.log(error));*/
                        }
                        }
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="transparent"
                        textStyle={{color: "#bcbec1"}}
                        title="Sign In"
                        onPress={() => navigation.navigate("SignIn")}
                    />
                </Card>
            </View>
        );
    }
}

export default graphql(createUser, {name: 'createUser'})(SignUp)