import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';



const PROJECT_ID = 'cjcdgoedg0bj10119crfhg2f9';
const NETWORK_INTERFACE_URL = `https://api.graph.cool/simple/v1/${PROJECT_ID}`;
const SUSBSCRIPTION_CLIENT_URL = `wss://subscriptions.graph.cool/v1/${PROJECT_ID}`;

const wsClient = new SubscriptionClient(SUSBSCRIPTION_CLIENT_URL, {
    reconnect: true
});

const networkInterface = createNetworkInterface({
    uri: NETWORK_INTERFACE_URL
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);


const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
});

export default client;

