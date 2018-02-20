import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";
import {Card, Button, Text} from "react-native-elements";
import {onSignOut} from "./auth";
import gql from "graphql-tag";
import {graphql} from "react-apollo";

/*
const userDeal = gql`
    query ($id: ID!){
        User (id: $id){
            deals{
                title
                description
                image
                reduction
                category
            }
        }
    }`;
*/

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
        }
    }

    componentWillMount() {
        const name = AsyncStorage.getItem("name-user");
        name.then((data) => {
            this.setState({name: data});
        }).catch();
        const email = AsyncStorage.getItem("email-user");
        email.then((data) => {
            this.setState({email: data});
        }).catch();
        const id = AsyncStorage.getItem("id-user");
        id.then((data) => {
            this.setState({id: data});
        }).catch();
    }

    /*_queryUserDeal = async () => {
        const {id} = this.state;
        console.log(id);
        const {data} = await this.props.mutate({
            variables: {
                id: 'cjdslw78jyxqc01224v71mrdp'
            }
        });
        console.log(data);
    };*/

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{paddingVertical: 20}}>
                <Card title={this.state.name}>
                    <View
                        style={{
                            backgroundColor: "#bcbec1",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            alignSelf: "center",
                            marginBottom: 20
                        }}
                    >
                        <Text style={{color: "white", fontSize: 28}}>{this.state.name}</Text>
                    </View>
                    <Button
                        backgroundColor="#03A9F4"
                        title="SIGN OUT"
                        onPress={() => {
                            onSignOut();
                            navigate("SignIn");
                        }
                        }
                    />
                </Card>
                {/*<Card>
                    <Button title="PRESS ME" onPress={() => {
                        this._queryUserDeal();
                    }}/>
                </Card>*/}
            </View>
        );
    }
}

/*
export default ({navigation}) => (
    <View style={{paddingVertical: 20}}>
        <Card title="John Doe">
            <View
                style={{
                    backgroundColor: "#bcbec1",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    alignSelf: "center",
                    marginBottom: 20
                }}
            >
                <Text style={{color: "white", fontSize: 28}}>JD</Text>
            </View>
            <Button
                backgroundColor="#03A9F4"
                title="SIGN OUT"
                onPress={() => {
                    onSignOut();
                    navigation.navigate("SignIn");
                }
                }
            />
        </Card>
    </View>
);*/

//export default graphql(userDeal)(Profile);