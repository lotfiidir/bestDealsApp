import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class dealCard extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <View style={style.cards}>
                    <View style={{flex:1}}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: 'https://logo.clearbit.com/samsung.com'}}
                        />
                    </View>
                    <View style={{flex:4}}>
                        <Text style={{fontSize:22}}>-20%</Text>
                        <Text>Samsung galaxy S5</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    cards: {
        flexDirection:'row',
        width: '90%',
        height: 100,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FFFFFF'
    }
});
