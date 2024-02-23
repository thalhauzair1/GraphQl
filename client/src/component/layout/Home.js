import AddCar from '../forms/AddCar';
import AddPeople from '../forms/AddPeople';
import Peoples from '../lists/Peoples';
import Title from './Title';

const Home = () => {

    return (

      <div className="App">
        <Title />
        <AddPeople />
        <AddCar/>
        <Peoples/>
        
      </div>
    )

}

export default Home
