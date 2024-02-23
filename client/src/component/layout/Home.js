import AddCar from '../forms/AddCar';
import AddPeople from '../forms/AddPeople';
import Peoples from '../lists/Peoples';
import Title from './Title';

const Home = () => {

 const style={
    border:"2px solid black",
    width:"90vw",
    margin: "20px auto",
    

  }

    return (

      <div className="App" style={style}>
        <Title />
        <AddPeople />
        <AddCar/>
        <Peoples/>
        
      </div>
    )

}

export default Home
