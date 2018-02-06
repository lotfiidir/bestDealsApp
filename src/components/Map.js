import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StackNavigator} from 'react-navigation';


class Map extends Component {
    render() {
        const {region} = this.props;
        console.log(region);

        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        );
    }
}

const RouteConfig = {
    Map: {screen: Map}
};

export default StackNavigator(RouteConfig);

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
