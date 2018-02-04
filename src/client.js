
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'



const NETWORK_INTERFACE_URL = `https://api.graph.cool/simple/v1/__SIMPLE_API_ENDPOINT__`;
const SUSBSCRIPTION_CLIENT_URL = `wss://subscriptions.graph.cool/v1/__SIMPLE_API_ENDPOINT__`;

const httpLink = new HttpLink({
    uri: NETWORK_INTERFACE_URL
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default client;

