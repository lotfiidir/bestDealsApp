import React, {Component} from "react";
import {View, Text} from "react-native";
import {Card, Button, FormLabel, FormInput} from "react-native-elements";
import {onSignIn} from "./auth";
import {auth0} from "./auth-cridentials";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {StackNavigator} from "react-navigation";

import SignIn from './SignIn';

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
            name
            email
        }
    }`;


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorEmail: '',
            password: '',
            errorPassword: '',
            errorConfirmPassword: '',
            name: '',
            errorName: '',
            error: '',
            isValid: ''
        }
    }

    _signUp = async () => {
        const {email, password, name} = this.state;
        const result = await this.props.createUser({
            variables: {email, password, name}
        });
        return result.data.createUser;
    };

    _isValidate() {
        const {email, password, name, errorPassword} = this.state;
        if (email != '' && password != '' && errorPassword == '' && name != '') {
            this.setState({isValid: true})
        }
        this.setState({isValid: true})
    }

    _validation() {
        const {email, password, name} = this.state;
        if (email == '') {
            this.setState({errorEmail: 'Manquant'})
        }
        if (name == '') {
            this.setState({errorName: 'Manquant'})
        }
        if (password == '') {
            this.setState({errorPassword: 'Manquant'})
        }
        this._isValidate()
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <Text style={{color: "#FF0000"}}>{this.state.error}</Text>
                    <FormLabel>Nom * <Text style={{color: "#FF0000"}}>{this.state.errorName}</Text></FormLabel>
                    <FormInput onChangeText={(text) => {
                        if (text != '') {
                            this.setState({name: text})
                            this.setState({errorName: ''})
                        }
                    }} placeholder="Nom..."/>
                    <FormLabel>Email * <Text style={{color: "#FF0000"}}>{this.state.errorEmail}</Text></FormLabel>
                    <FormInput onChangeText={(text) => {
                        if (text != '') {
                            this.setState({email: text})
                            this.setState({errorEmail: ''})
                        }

                    }} placeholder="Addresse mail..."/>
                    <FormLabel>Mot de passe * <Text
                        style={{color: "#FF0000"}}>{this.state.errorPassword}</Text></FormLabel>
                    <FormInput onChangeText={(text) => {
                        if (text != '') {
                            this.setState({password: text})
                            this.setState({errorEmail: ''})
                        }
                    }} secureTextEntry
                               placeholder="Mot de passe..."/>
                    <FormLabel>Confirmé mot de passe * <Text
                        style={{color: "#FF0000"}}>{this.state.errorConfirmPassword}</Text></FormLabel>
                    <FormInput secureTextEntry onChangeText={(text) => {
                        if (text != this.state.password) {
                            this.setState({errorPassword: ' Pas similaire'})
                        } else {
                            this.setState({errorPassword: ''})
                        }
                    }} placeholder="Confirmer mot de passe..."/>

                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="S'inscrire"
                        onPress={() => {
                            this._validation();
                            if (this.state.isValid) {
                                let propUser = {};
                                this._signUp().then((userData) => {
                                    propUser = userData;
                                })
                                    .catch((error) => {
                                        console.log(error);
                                        this.setState({error: 'Utilisateur déja existant'})
                                    });
                                onSignIn(propUser);
                                navigate("SignedIn", propUser.user);
                            }
                        }
                        }
                    />
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="transparent"
                        textStyle={{color: "#bcbec1"}}
                        title="Se connecter"
                        onPress={() => navigate("SignIn")}
                    />
                </Card>
            </View>
        );
    }
}

export default graphql(createUser, {name: 'createUser'})(SignUp);