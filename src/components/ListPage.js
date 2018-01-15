import React from 'react'
import Deal from './Deal'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
    View,
    TouchableHighlight,
    ListView,
    Modal,
    StyleSheet,
    Text
} from 'react-native'
import CreatePage from './CreatePage'

const allDealsQuery = gql`
    query {
        allDeals(orderBy: createdAt_DESC) {
            id
            image
            title
            description
        }
    }`;


class ListPage extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
            modalVisible: false,
            user: undefined,
        }

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.allDealsQuery.loading && !nextProps.allDealsQuery.error) {
            const {dataSource} = this.state
            this.setState({
                dataSource: dataSource.cloneWithRows(nextProps.allDealsQuery.allDeals),
            })
        }
    }

    render () {
        if (this.props.allDealsQuery.loading) {
            return (<Text>Loading</Text>)
        }

        return (
            <View style={styles.container}>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <CreatePage
                        onComplete={() => {
                            this.props.allDealsQuery.refetch()
                            this.setState({modalVisible: false})
                        }}/>
                </Modal>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(deal) => (
                        <Deal
                            description={deal.description}
                            title={deal.title}
                            image={deal.image}
                        />
                    )}
                />
                <TouchableHighlight
                    style={styles.createDealButtonContainer}
                    onPress={this._createDeal}
                >
                    <Text style={styles.createDealButton}>Create Deal</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _createDeal = () => {
        // this.props.router.push('/create');
        this.setState({modalVisible: true})

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    createDealButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    createDealButton: {
        backgroundColor: 'rgba(39,174,96,1)',
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        height: 60,
        width: 480,
        paddingTop: 18,
    }
});

export default graphql(allDealsQuery, {name: 'allDealsQuery'})(ListPage)
