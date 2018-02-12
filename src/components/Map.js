import React, {Component} from 'react';
import {StyleSheet, View, Platform, PermissionsAndroid, Alert, ActivityIndicator} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

const allDealsQuery = gql`
    query {
        allDeals(orderBy: createdAt_DESC) {
            id
            title
            location {
                latitude
                longitude
            }
        }
    }`;


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: {
                location: {
                    latitude: 49.209355,
                    longitude: -0.363901,
                },
                title: '',
            },
            error: null
        };
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    _locateMe() {
        if (Platform.OS === 'android') {
            PermissionsAndroid.check(PermissionsAndroid.ACCESS_FINE_LOCATION)
                .then()
        } else {
            console.log('locate');
        }
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("Location permission denied");
                Alert.alert(
                    'Can we access your Location?',
                    'We need access so you can set your location',
                    [
                        {
                            text: 'No way',
                            onPress: () => console.log('Permission denied'),
                            style: 'cancel',
                        },
                        this.state.photoPermission == 'undetermined'
                            ? {text: 'OK', onPress: this._requestPermission}
                            : {text: 'Open Settings', onPress: PermissionsAndroid.openSettings},
                    ],
                )
            }
        } catch (err) {
            console.warn(err)
        }
    };

    _alertForGPSPermission() {
        console.log('alert');
        Alert.alert(
            'Can we access your Location?',
            'We need access so you can set your location',
            [
                {
                    text: 'No way',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                this.state.photoPermission == 'undetermined'
                    ? {text: 'OK', onPress: this._requestPermission}
                    : {text: 'Open Settings', onPress: Permissions.openSettings},
            ],
        )
    }


    onRegionChangeComplete(region) {
        //console.log(region);
    }

    render() {
        const {loading} = this.props.data;
        let deals = [];
        if (this.props.data.allDeals) {
            deals = this.props.data.allDeals;
        }
        return (

            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 49.209355,
                        longitude: -0.363901,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    {loading && <Marker coordinate={this.state.deals.location} />}{
                    deals.map((deal, index) => {
                        return (
                            <Marker
                                coordinate={deal.location}
                                title={deal.title}
                                key={index}
                            />
                        )
                    })
                }
                </MapView>
                <Icon
                    raised
                    name='my-location'
                    color='#425458'
                    containerStyle={styles.buttonLocation}
                    onPress={() => this.requestLocationPermission()}/>

            </View>
        )
            ;
    }
}

const GQLDeals = graphql(allDealsQuery)(Map);

const RouteConfig = {
    Map: {screen: GQLDeals}
};

export default StackNavigator(RouteConfig);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonLocation: {
        position: 'absolute',
        top: 0,
        right: 0
    }
});
