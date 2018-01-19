import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

const NETWORK_INTERFACE_URL = 'https://api.graph.cool/simple/v1/cjcdgoedg0bj10119crfhg2f9';

const httpLink = new HttpLink({ uri: NETWORK_INTERFACE_URL });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


export default client;