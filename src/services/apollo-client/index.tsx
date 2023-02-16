import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ApolloLinkTimeout from 'apollo-link-timeout';

const timeoutLink = new ApolloLinkTimeout(100000);
const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const link = timeoutLink.concat(httpLink);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
