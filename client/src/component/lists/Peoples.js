import { useQuery } from "@apollo/client"
import { GET_PEOPLES } from "../../graphql/queries"
import { Card, List } from "antd"
import PeopleCard from "../listItems/PeopleCard"
const Peoples = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLES)


  if (loading) return 'data loading...'
  if (error) return `errooorr: ${error.message}`
  console.log(data)

  return (
    <div style={styles.container}>
      <h1>Records </h1>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <Card title={`${firstName} ${lastName}`} style={{width:"80vw"}} >
            <PeopleCard id={id} firstName={firstName} lastName={lastName} />
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  )
}



const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
  }
})
export default Peoples