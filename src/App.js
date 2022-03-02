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
  const token = JSON.parse(localStorage.getItem("token"));

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create new client instance connecting  React app to GraphQL server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
