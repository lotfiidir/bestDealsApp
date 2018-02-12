import React, {Component} from 'react';
import {Text, Modal, StyleSheet, Image, View, RefreshControl, ScrollView, ActivityIndicator} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import {StackNavigator} from 'react-navigation';
import {ListItem, Icon, Overlay} from 'react-native-elements';

import Deal from './Deal';
import CreateDeal from './CreatePage';

const allDealsQuery = gql`
    query {
        allDeals(orderBy: createdAt_DESC) {
            id
            image
            title
            reduction
            category
            description
            location {
                latitude
                longitude
            }
        }
    }`;

/*const allDealsQuerySubscription = gql`
    subscription {
        Deal(filter: {
            mutation_in: [CREATED]
        }) {
            node {
                description
                image
                title
            }
        }
    }
`;*/

class Deals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    /*componentWillMount() {
        this.props.data.subscribeToMore({
            document: allDealsQuerySubscription,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData) {
                    return prev;
                }
                const {node} = subscriptionData.data.Deal;
                return {
                    ...prev,
                    allDeals: [...prev.allDeals, node]
                }
            }
        })
    }*/


    render() {
        const {loading} = this.props.data;
        let deals = [];
        if (this.props.data.allDeals) {
            deals = this.props.data.allDeals;
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this._closeModal()}
                >
                    <CreateDeal
                        onComplete={() => {
                            this.props.data.refetch;
                            this.setState({modalVisible: false})
                        }}/>
                </Modal>
                <Icon
                    raised
                    name='add'
                    color='#f50'
                    containerStyle={styles.buttonAdd}
                    onPress={() => this._openModal()}/>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.props.data.networkStatus === 4}
                        onRefresh={this.props.data.refetch}
                    />
                }>
                    {loading && <ActivityIndicator style={{marginTop: 250}}/>}
                    {
                        deals.map((deal, index) => {
                            return (
                                <ListItem
                                    roundAvatar
                                    key={index}
                                    title={deal.title}
                                    subtitle={deal.description}
                                    avatar={{uri: deal.image}}
                                    onPress={() => this.props.navigation.navigate('Deal', {deal})}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    _openModal = () => {
        this.setState({modalVisible: true})
    };

    _closeModal = () => {
        this.setState({modalVisible: false});
    };
}

const GQLDeals = graphql(allDealsQuery)(Deals);

const RouteConfig = {
    Deals: {screen: GQLDeals},
    Deal: {screen: Deal}
};

export default StackNavigator(RouteConfig);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonAdd: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 10,
    }
});