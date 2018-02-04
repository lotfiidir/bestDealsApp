import React, {Component} from 'react';
import {Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import {StackNavigator} from 'react-navigation';
import { ListItem } from 'react-native-elements';

import Deal from './Deal';

const allDealsQuery = gql`
    query {
        allDeals(orderBy: createdAt_DESC) {
            id
            image
            title
            description
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
        console.log(deals);
        return (
            <ScrollView>
                {loading && <ActivityIndicator style={{marginTop: 250}}/>}
                {
                    deals.map((deal,index)=>{
                        return(
                            <ListItem
                                key={index}
                                title={deal.title}
                                onPress={() => this.props.navigation.navigate('Deal', {deal})}
                            />
                        )
                    })
                }
            </ScrollView>
        );
    }
}

const GQLDeals = graphql(allDealsQuery)(Deals);

const RouteConfig = {
    Deals : {screen: GQLDeals},
    Deal : {screen: Deal},
};

export default StackNavigator(RouteConfig);