import React, {Component} from 'react';
import {StyleSheet, View, Platform, PermissionsAndroid, Alert, ActivityIndicator} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

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
    static navigationOptions = {
        title: 'Carte des bon plans'
    };

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


    _alertForGPSPermission() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Utiliser la géolocalisation ?</h2> \
                            Pour pouvoir ajouter un bon plan:<br/><br/>\
                            Utiliser le GPS pour la localisation<br/><br/>",
            ok: "OUI",
            cancel: "NON",
        }).then(() => {
                this.watchId = navigator.geolocation.watchPosition(position => {
                    this.setState({
                        deals: {
                            location: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }
                    });
                    console.log(this.state.deals.location);
                })
            }, (error) => {
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        )
            .then(() => {
                navigator.geolocation.getCurrentPosition(position => {
                    this.setState({
                        deals:{
                            location: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            });
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
                        latitude: this.state.deals.location.latitude,
                        longitude: this.state.deals.location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    region={{
                        latitude: this.state.deals.location.latitude,
                        longitude: this.state.deals.location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}

                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    {loading && <Marker coordinate={this.state.deals.location}/>}{
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
                    onPress={() => this._alertForGPSPermission()}/>

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
