import React, {Component} from "react";
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "./auth";
import gql from "graphql-tag";
import {graphql} from "react-apollo";

const signinUser = gql`
    mutation ($email: String!, $password: String!){
        signinUser(email: {
            email: $email,
            password: $password
        }){
            token
            user {
                id
                name
                email
            }
        }
    }`;

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
        }
    }

    _signIn = async () => {
        const {email, password} = this.state;
        const result = await this.props.signinUser({
            variables: {email, password}
        });
        return result.data.signinUser;
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{ paddingVertical: 20 }}>
                <Card title="SIGN IN">
                    <Text style={{color: "#FF0000"}}>{this.state.error}</Text>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Adresse mail..." onChangeText={(text) => this.setState({email: text})} />
                    <FormLabel>Mot de passe</FormLabel>
                    <FormInput secureTextEntry placeholder="Mot de passe..." onChangeText={(text) => this.setState({password: text})} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"
                        onPress={() => {
                            this._signIn().then((userData) => {
                                onSignIn(userData);
                                navigate("SignedIn", userData.user);
                            })
                                .catch((error) => {
                                    this.setState({error: 'Email ou mot de passe incorrect !'})
                                });
                        }}
                    />
                </Card>
            </View>
        );
    }
}

export default graphql(signinUser, {name: 'signinUser'})(SignIn);