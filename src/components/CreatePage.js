import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {
    View,
    TextInput,
    Image,
    Text,
    Modal,
    StyleSheet,
    CameraRoll,
    BackHandler,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import Camera from 'react-native-camera';
import {Icon, CheckBox} from 'react-native-elements';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


const createDealMutation = gql`
    mutation ($description: String!, $image: String!, $title: String!, $reduction: Int, $location: DeallocationLocation, $category: Json ){
        createDeal(description: $description, image: $image, title: $title, reduction: $reduction, location: $location, category: $category ) {
            id
            location {
                id
            }
        }
    }
`;


class CreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            image: '',
            title: '',
            reduction: null,
            location: null,
            modalVisible: false,
            checked: false,
            items: {},
            category: [
                {
                    value: 'Accessoires & gadgets',
                    checked: false
                },
                {
                    value: 'Alimentation & boissons',
                    checked: false
                },
                {
                    value: 'Animaux',
                    checked: false
                },
                {
                    value: 'Culture & divertissement',
                    checked: false
                },
                {
                    value: 'Applis & logiciels',
                    checked: false
                },
                {
                    value: 'Mode & accessoires',
                    checked: false
                },
                {
                    value: 'Services divers',
                    checked: false
                },
                {
                    value: 'Image, son & vidéo',
                    checked: false
                },
                {
                    value: 'Sport & plein air',
                    checked: false
                },
                {
                    value: 'Voyages & sorties',
                    checked: false
                },
                {
                    value: 'Informatique',
                    checked: false
                },
                {
                    value: 'Consoles & jeux vidéo',
                    checked: false
                },
                {
                    value: 'Maison & jardins',
                    checked: false
                },
                {
                    value: 'Santé & cosmétiques',
                    checked: false
                },
                {
                    value: 'Téléphonie',
                    checked: false
                }
            ]
        };
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    componentDidMount() {

        setTimeout(() => {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Utiliser la géolocalisation ?</h2> \
                            Pour pouvoir ajouter un bon plan:<br/><br/>\
                            Utiliser le GPS pour la localisation<br/><br/>",
                ok: "OUI",
                cancel: "NON",
            }).then(() => {
                    this.watchId = navigator.geolocation.watchPosition(position => {
                        this.setState({
                            location: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        })
                    })
                }, (error) => {
                    console.log(error);
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
            )
                .then(() => {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.setState({
                            location: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        })
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 200)

    }

    render() {
        return (
            <ScrollView style={styles.ScrollContainer}>
                <View style={styles.container}>
                    <View style={styles.addImageContainer}>
                        <View style={styles.addImage}>
                            <View style={styles.photoPlaceholderContainer}>
                                {
                                    this.state.image.length > 0 ?
                                        <Image
                                            source={{uri: this.state.image}}
                                            style={{height: 80, width: 80}}
                                            resizeMode='contain'
                                        />
                                        :
                                        <View style={styles.photoPlaceholder}/>
                                }
                            </View>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => this._closeModal()}>
                                <Camera style={styles.camera}
                                        ref={(cam) => this.camera = cam}
                                        captureQuality="medium"
                                        captureTarget={Camera.constants.CaptureTarget.temp}>
                                    <Icon
                                        raised
                                        name='camera'
                                        containerStyle={styles.iconCamera}
                                        onPress={this.takePicture.bind(this)}/>
                                </Camera>
                            </Modal>
                            <Text onPress={() => this._openModal()}>Capturer</Text>
                            <TextInput
                                style={styles.imageInput}
                                placeholder="Coller l'url de l'image ici..."
                                onChangeText={(text) => this.setState({image: text})}
                                value={this.state.image}
                                placeholderTextColor='rgba(42,126,211,.5)'
                            />
                        </View>
                    </View>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder='Titre...'
                        onChangeText={(text) => this.setState({title: text})}
                        value={this.state.title}
                    />
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder='Description...'
                        onChangeText={(text) => this.setState({description: text})}
                        value={this.state.description}
                    />
                    <TextInput
                        style={styles.reductionInput}
                        keyboardType='numeric'
                        placeholder='% de la réduction...'
                        onChangeText={(number) => this.setState({reduction: parseInt(number)})}
                        value={this.state.reduction}
                    />
                    <Text>Catégories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.scrollHoriz}>
                            {this.state.category.map((cat, index) => {
                                return (
                                    <CheckBox
                                        center
                                        title={cat.value}
                                        iconLeft
                                        iconType='material'
                                        checkedIcon='done'
                                        uncheckedIcon='add'
                                        key={index}
                                        onPress={() => this._handleCheckbox(cat)}
                                        checked={cat.checked}
                                    />
                                );

                            })}

                        </View>
                    </ScrollView>

                    <View style={styles.buttons}>
                        <TouchableHighlight
                            style={styles.cancelButton}
                            onPress={() => this.props.onComplete()}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.saveButton}
                            onPress={() => this._createDeal()}
                        >
                            <Text style={styles.saveButtonText}>Create Deal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }

    _reformateChecked(){
        const check = this.state.category.filter((check) => {
            return check.checked
        });
        const newChecked = check.map((c) => {
            delete c.checked;
            return c;
        });
        return newChecked;
    }

    _createDeal = async () => {
        const category = this._reformateChecked();
        const {description, image, title, reduction, location} = this.state;
        this.componentDidMount();
        if (location != null) {
            await this.props.createDealMutation({
                variables: {description, image, title, reduction, location, category}
            });
            this.props.onComplete()
        }
    };

    _openModal = () => {
        this.setState({modalVisible: true})
    };

    _closeModal = () => {
        this.setState({modalVisible: false});
    };

    _handleCheckbox = (item) => {
        const itemchecked = item;
        itemchecked.checked = !item.checked;
        this.setState({
            ...item,
            checked: !item.checked
        });
    };

    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log("data", data);
                this.setState({image: data.path});
                this._closeModal();
                CameraRoll.getPhotos({
                    first: 1,
                    assetType: 'Photos'
                })
                    .then(r => {
                        console.log(r.edges);
                    });
            })
            .catch(err => console.error(err));
    }
}


const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {},
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconCamera: {
        flex: 0,
        borderRadius: 5,
        padding: 10,
        margin: 40
    },
    addImageContainer: {
        backgroundColor: 'rgba(0,0,0,.03)',
    },
    addImage: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    photoPlaceholderContainer: {
        alignItems: 'center',
        height: 80,
    },
    photoPlaceholder: {
        backgroundColor: 'rgba(42,126,211,.1)',
        height: 80,
        width: 80,
    },
    imageInput: {
        color: 'rgba(42,126,211,1)',
        height: 60,
    },
    descriptionInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    reductionInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    scrollHoriz: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 700,
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(39,174,96,1)',
        height: 45,
        borderRadius: 2,
    },
    saveButtonText: {
        color: 'white',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
    },
    cancelButtonText: {
        color: 'rgba(0,0,0,.5)',
    },
});

export default graphql(createDealMutation, {name: 'createDealMutation'})(CreatePage)