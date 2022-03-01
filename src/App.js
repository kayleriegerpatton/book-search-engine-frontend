import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";
import { AppRoutes } from "./AppRoutes";

// graphql port
const httpLink = createHttpLink({ uri: "http://localhost:4000" });

const authLink = setContext((_, { headers }) => {
  //* get authentication token from LS if exists
  // const token = JSON.parse(localStorage.getItem('token'));

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzdDJAZW1haWwuY29tIiwiaWQiOiI2MjFlMmE5NGI0NGUxMjVjMTNjNTZkZDYifSwiaWF0IjoxNjQ2MTQ0MTQ4LCJleHAiOjE2NDYxNTEzNDh9.7JWmwK_E9-AKear-FKoiU8t9LQ8ntH5qA7CrWG9cAuU";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create new client instance connecting to GraphQL server
const client = new ApolloClient({
  url: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </ApolloProvider>
  );
}

export default App;
