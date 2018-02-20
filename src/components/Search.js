import React, {Component} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements'

import gql from "graphql-tag";
import {graphql} from "react-apollo";


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
            user{
                id
                name
            }
        }
    }`;

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            deals: []
        }
    }
    componentWillMount(){
        if (this.props.data.allDeals) {
            this.setState({deals: this.props.data.allDeals});
        }
    }

    _filterSearch(text){
        const newData = this.props.data.allDeals.filter((item)=>{
            const itemData = item.title.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1
        });
        this.setState({
            deals:  newData
        })
    }
    render(){
        const {loading} = this.props.data;
        console.log(this.state.deals);
        return(
            <View>
                <SearchBar
                    lightTheme
                    onChangeText={(text) => {this._filterSearch(text)}}
                    onClearText={()=> {console.log("text clear")}}
                    placeholder='Rechercher...' />
                <ScrollView>
                    {loading && <ActivityIndicator style={{marginTop: 250}}/>}
                    {
                        this.state.deals.map((deal, index) => {
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
        )
    }
}

export default graphql(allDealsQuery)(Search)