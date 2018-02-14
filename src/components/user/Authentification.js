import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';

import {auth0, AUTH0_DOMAIN} from './auth-cridentials';

export default class Authentification extends Component {
    loginWindow() {
        auth0
            .webAuth
            .authorize({scope: 'openid profile email', audience: 'https://bestdealsapp.eu.auth0.com/userinfo'})
            .then(credentials =>
                console.log(credentials)
            )
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please click the Button to login</Text>
                <Button title="login" onPress={() => this.loginWindow()}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       alignContent: 'center'
   }
});