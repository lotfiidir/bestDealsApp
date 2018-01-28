import React, {Component} from 'react'
import { Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'

const {width} = Dimensions.get('window');

const Field = ({name, value}) => <Text style={styles.field}>{`${name}: ${value}`}</Text>

export default class Deal extends Component {
    static navigationOptions = (props) => {
        const {title} = props.navigation.state.params.deal;
        return ({
            title: title
        })
    };
    /*state = {
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
    }*/

    render () {
        //const {width, height} = this.state;
        const {image, title, description} = this.props.navigation.state.params.deal;
        return (
            <ScrollView style={styles.container}>
                {
                    image && (
                        <Image
                            resizeMode='contain'
                            source={{uri:image}}
                            style={styles.image}
                        />
                    )
                }
                { title && <Field name='Title' value={title} />}
                { description && <Field name='Description' value={description} />}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        height: 200,
        width,
        marginBottom: 20,
    },
    field: {
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
    }
});