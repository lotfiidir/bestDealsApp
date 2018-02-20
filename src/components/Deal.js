import React, {Component} from 'react'
import {Image, Text, StyleSheet, Dimensions, Alert, View, ScrollView, Modal, AsyncStorage} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import {Icon} from 'react-native-elements';

import UpdateDeal from './UpdateDeal';

const {width} = Dimensions.get('window');

const Field = ({name, value}) => <Text style={styles.field}>{`${name}: ${value}`}</Text>

export default class Deal extends Component {
    static navigationOptions = (props) => {
        const {title} = props.navigation.state.params.deal;
        return ({
            title: title,
        })
    };

    state = {
        modalVisible: false,
        permission: false,
        userid: '',
    };

    componentWillMount() {
        const idUser = AsyncStorage.getItem("id-user");
        idUser.then((data) => {
            this.setState({userid: data});
            if (this.state.userid == this.props.navigation.state.params.deal.user.id) {
                this.setState({permission: true})
            }
        }).catch();
    }

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
    _openModal = () => {
        this.setState({modalVisible: true})
    };

    _closeModal = () => {
        this.setState({modalVisible: false});
    };

    _deleteDeal = () => {
        Alert.alert(
            'Etes vous sur de vouloir supprimer ce deal ?',
            'Supprimer le deal',
            [
                {text: 'NON', onPress: () => console.log('Cancel Pressed')},
                {text: 'Oui', onPress: () => console.log('OK Pressed')},
            ]
        )
    };

    render() {
        //const {width, height} = this.state;
        const {id, image, description, location, reduction, title, category, user} = this.props.navigation.state.params.deal;
        console.log(this.state.permission);
        return (
            <View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this._closeModal()}
                >
                    <UpdateDeal
                        id={id}
                        title={title}
                        description={description}
                        reduction={reduction}
                        category={category}
                        image={image}
                        onComplete={() => {
                            this.setState({modalVisible: false})
                        }}/>
                </Modal>
                <ScrollView style={styles.container}>
                    {
                        image && (
                            <Image
                                resizeMode='contain'
                                source={{uri: image}}
                                style={styles.image}
                            />
                        )
                    }
                    {description && <Field name='Description' value={description}/>}
                    {reduction && <Field name='Reduction' value={`- ${reduction}%`}/>}
                    {category && <Field name='Categorie' value={category.map((cat) => {
                        return ` ${cat.value}`;
                    })}/>}
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1 * (width / 250),
                        }}
                    >
                        <Marker coordinate={location}/>
                    </MapView>
                    {this.state.permission && <Icon
                        raised
                        name='edit'
                        color='#f50'
                        containerStyle={styles.buttonEdit}
                        onPress={() => this._openModal()}/>}
                    {this.state.permission &&<Icon
                        raised
                        name='delete'
                        color='#f50'
                        containerStyle={styles.buttonDelete}
                        onPress={() => this._deleteDeal()}/>}
                </ScrollView>
            </View>
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
    },
    map: {
        height: 250
    },
    buttonEdit: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    buttonDelete: {
        position: 'absolute',
        top: 60,
        right: 0,
        zIndex: 10,
    }
});