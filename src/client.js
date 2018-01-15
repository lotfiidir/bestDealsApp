import {ApolloClient, createNetworkInterface} from 'react-apollo';
//import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

const NETWORK_INTERFACE_URL = 'https://api.graph.cool/simple/v1/cjcdgoedg0bj10119crfhg2f9';

const networkInterface = createNetworkInterface({uri: NETWORK_INTERFACE_URL});

const client = new ApolloClient({
    networkInterface: networkInterface
});

export default client;