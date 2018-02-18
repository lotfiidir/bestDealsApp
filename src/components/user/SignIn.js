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
        await this.props.signinUser({
            variables: {email, password}
        });
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{ paddingVertical: 20 }}>
                <Card title="SIGN IN">
                    <Text style={{color: "#FF0000"}}>{this.state.error}</Text>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." onChangeText={(text) => this.setState({email: text})} />
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." onChangeText={(text) => this.setState({password: text})} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"
                        onPress={() => {
                            this._signIn().then(() => {
                                onSignIn();
                                navigate("SignedIn");
                            })
                                .catch((error) => {
                                    console.log("erroe",error);
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