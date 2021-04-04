import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Router } from "@reach/router";

import Character from "./pages/Character";
import Characters from "./pages/Characters";
import Episode from "./pages/Episode";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import Location from "./pages/Location";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="container-lg">
        <Router>
          <Characters path="characters" />
          <Character path="character/:id" />
          <Episodes path="episodes" />
          <Episode path="episode/:id" />
          <Locations path="locations" />
          <Location path="location/:id" />
          <Characters default />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
