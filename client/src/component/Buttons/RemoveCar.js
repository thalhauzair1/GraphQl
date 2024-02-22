import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { GET_CAR, REMOVE_CAR } from "../../graphql/queries"

const RemoveCar = ({ id }) => {

    const [removeCar] = useMutation(REMOVE_CAR, {
        refetchQueries: [{ query: GET_CAR }],
        awaitRefetchQueries: true
    })
    
    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this Car?')
    
        if (result) {
        removeCar({
            variables: {
            id
            }
        })
        }
    }
    
    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
    }

    export default RemoveCar