import { Button, Card, List } from "antd"
import { GET_CARS_BY_PEOPLE } from "../../graphql/queries"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import CarCard from "../listItems/CarCard"

const PersonWithcars =() => {
    const styles = getStyles()
    const personId = useParams()
    console.log(personId)

const { loading, error, data } = useQuery(GET_CARS_BY_PEOPLE, {
  variables: { personId: personId.personId } ,
  });


if (loading) return 'data loading...'
if (error) return `errooorr: ${error.message}`
const cars = data && data.carsOwnedByPeople;

return (
    <div style={styles.container}>
      <Button type="primary" href="/" style={{
        margin: '10px',
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'black'
      }}>Home</Button>
      <h1 style={{textAlign:'center'}}>Cars Owned By People</h1>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {cars.map(car => (
          <List.Item key={car.id}>
            <Card title={`${car.year} ${car.make} ${car.model}`} style={{ width: '80vw' }}>
              <CarCard car={car} />
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  )
}
const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }
  })
export default PersonWithcars