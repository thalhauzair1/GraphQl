import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import statement
import Home from './component/layout/Home';
import PersonWithcars from './component/lists/PersonWithcars';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <Router> 
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/:personId" element={<PersonWithcars />} /> 
        </Routes>
      </ApolloProvider>
    </Router>
  );
};

export default App;
