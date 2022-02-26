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

// create new client instance connecting to GraphQL server
const client = new ApolloClient({
  url: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </ApolloProvider>
  );
};
