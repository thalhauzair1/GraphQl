import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdatePeople from '../forms/UpdatePeople'
import RemovePeople from '../Buttons/RemovePeople'
import { GET_CARS_BY_PEOPLE } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const PeopleCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const { loading, error, data } = useQuery(GET_CARS_BY_PEOPLE, {
    variables: { personId: id }, 
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const cars = data && data.carsOwnedByPeople;

  return (
    <div>
      {editMode ? (
        <UpdatePeople
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePeople id={id} />
          ]}
        >
          <div>
            <p>{firstName} {lastName}</p>
            {cars && (
              <div>
                <p>Cars Owned:</p>
                <ul>
                  {cars.map(car => (
                    <li key={car.id}>
                      {car.year} {car.make} {car.model} - ${car.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

export default PeopleCard