import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class MapScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Carte',

    };
    render() {
        return (
            <View>
                <Text>MAP VIEW</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});