import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const httpLink = createHttpLink({
  uri: 'https://api.opencollective.com/graphql/v2/',
});

const authLink = setContext(async (_, { headers }) => {
  // Retrieve the authorization token from AsyncStorage
  const authorization = await AsyncStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: authorization ? `Bearer ${authorization}` : null,
      'Content-Type': 'application/json', // Set content-type header
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
