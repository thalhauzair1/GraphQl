import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Title from './component/layout/Title';
import Peoples from './component/lists/Peoples';
import AddPeople from './component/forms/AddPeople';
import AddCar from './component/forms/AddCar';
import CarsByPeople from './component/lists/CarsByPeople';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>

      <div className="App">
        <Title />
        <AddPeople />
        <AddCar/>
        <Peoples/>
        
      </div>
    </ApolloProvider>
  );
}

export default App;
