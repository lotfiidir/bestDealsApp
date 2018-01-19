import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class Deal extends React.Component {

    state = {
        width: 0,
        height: 0,
    };

    componentDidMount() {
        Image.getSize(this.props.image, (width, height) => {
            const imageHeight =  250;
            const scaleFactor = height / imageHeight;
            const imageWidth = width / scaleFactor;
            this.setState({width: imageWidth, height: imageHeight});
        })
    }

    render () {
        const {width, height} = this.state;
        return (
            <View>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text style={styles.title}>
                    {this.props.description}
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: this.props.image }}
                        style={{width, height}}
                        resizeMode='contain'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.07)'
    },
    title: {
        padding: 22,
        color: 'rgba(0,0,0,.8)',
        fontWeight: '300',
        fontSize: 20,
    },
});