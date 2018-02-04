import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
//import MapView from 'react-native-maps';


export default class MapScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>DEALSSSSS</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});