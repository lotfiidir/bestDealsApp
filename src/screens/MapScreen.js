import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class MapScreen extends React.Component {
    render() {
        return (
            <View style={styles.map}>
                <Text h2>MAP VIEW</Text>
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
    map: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});