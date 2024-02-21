import { List } from "antd"
import { GET_CARS_BY_PEOPLE } from "../../graphql/queries"
import { useQuery } from "@apollo/client"

const CarsByPeople =({personId}) => {
    const styles = getStyles()

const { loading, error, data } = useQuery(GET_CARS_BY_PEOPLE, {
    variables: { personId },
  });


if (loading) return 'data loading...'
if (error) return `errooorr: ${error.message}`
console.log(data)

return (
  <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
    {data.carsOwnedByPeople.map(({ id, make, model,year,price }) => (
      <List.Item key={id}>
        </List.Item>
    ))}
    </List>
)
}
const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
export default CarsByPeople