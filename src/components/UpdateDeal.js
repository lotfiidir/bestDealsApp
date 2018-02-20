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
    BackHandler,
    ScrollView,
    TouchableHighlight, AsyncStorage,
} from 'react-native';
import {Icon, CheckBox, List, ListItem} from 'react-native-elements';


const updateDealMutation = gql`
    mutation ($id: ID!, $description: String!, $image: String!, $title: String!, $reduction: Int, $category: Json ){
        updateDeal(id: $id, description: $description, image: $image, title: $title, reduction: $reduction, category: $category ) {
            id
        }
    }
`;

class UpdateDeal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.description,
            image: props.image,
            title: props.title,
            reduction: props.reduction,
            modalVisible: false,
            checked: false,
            items: props.category,
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
            ],
            brand: [],
        };
    }

    componentWillMount() {
        this.state.category.filter((cat) => {
            this.state.items.map((item) => {
                if (cat.value == item.value) {
                    cat.checked = true;
                    this.setState({
                        ...cat,
                        checked: true
                    });
                }
            });
        });
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
                            <TextInput
                                style={styles.imageInput}
                                placeholder="Coller l'url de l'image ici..."
                                onChangeText={(text) => this.setState({image: text})}
                                value={this.state.image}
                                placeholderTextColor='rgba(42,126,211,.5)'
                            />
                        </View>
                    </View>
                    <View style={styles.brandContainer}>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder='Marque, magasin..'
                            onChangeText={(text) => this._logoApi(text)}
                        />
                        <List containerStyle={{marginBottom: 20}} style={styles.autoCompleteList}>
                            {
                                this.state.brand.map((logo, i) => (
                                    <ListItem
                                        onPress={() => {
                                            this.setState({
                                                image: logo.logo,
                                                brand: []
                                            })
                                        }}
                                        avatar={{uri: logo.logo}}
                                        key={i}
                                        title={logo.name}
                                    />
                                ))
                            }
                        </List>
                    </View>
                    <TextInput
                        returnKeyType="next"
                        style={styles.descriptionInput}
                        placeholder='Titre...'
                        onChangeText={(text) => this.setState({title: text})}
                        value={this.state.title}
                    />
                    <TextInput
                        returnKeyType="next"
                        multiline={true}
                        style={styles.descriptionInput}
                        placeholder='Description...'
                        onChangeText={(text) => this.setState({description: text})}
                        value={this.state.description}
                    />
                    <TextInput
                        returnKeyType="next"
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
                            onPress={() => this._updateDeal()}
                        >
                            <Text style={styles.saveButtonText}>Modifié le deal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }

    _reformateChecked() {
        const check = this.state.category.filter((check) => {
            return check.checked
        });
        const newChecked = check.map((c) => {
            delete c.checked;
            return c;
        });
        return newChecked;
    }

    _updateDeal = async () => {
        const category = this._reformateChecked();
        const {id} = this.props;
        const {description, image, title, reduction} = this.state;
        await this.props.updateDealMutation({
            variables: {id, description, image, title, reduction, category}
        });
        this.props.onComplete()
    };

    _logoApi(brand) {
        fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${brand}`)
            .then((data) => {
                if (brand.length > 0) {
                    this.setState({brand: JSON.parse(data._bodyInit)})
                    return;
                }
                this.setState({brand: []})
            })
            .catch(() => {
                console.log("error")
            });

    }

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
}

const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {},
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
    brandContainer: {
        position: 'relative',
    },
    autoCompleteList: {
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0,
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

export default graphql(updateDealMutation, {name: 'updateDealMutation'})(UpdateDeal)