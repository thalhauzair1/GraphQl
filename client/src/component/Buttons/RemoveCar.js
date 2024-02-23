import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_CAR, GET_CAR, GET_CARS_BY_PEOPLE } from "../../graphql/queries";

const RemoveCar = ({ id }) => {
  const { loading, error, data } = useQuery(GET_CAR);

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
        try {
          const existingData = cache.readQuery({ query: GET_CARS_BY_PEOPLE, variables: { personId: removeCar.personId } });
          if (!existingData) return;
      
          const updatedCars = existingData.carsOwnedByPeople.filter(car => car.id !== removeCar.id);
          cache.writeQuery({
            query: GET_CARS_BY_PEOPLE,
            variables: { personId: removeCar.personId },
            data: { carsOwnedByPeople: updatedCars }, 
          });
        } catch (error) {
          console.error('Error updating cache:', error);
        }
      },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      removeCar({ variables: { id } });
    }
  };

  return (
    <DeleteOutlined
      key='delete'
      style={{ color: 'red' }}
      onClick={handleDelete}
    />
  );
};

export default RemoveCar;
