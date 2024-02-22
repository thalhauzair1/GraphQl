import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLES, REMOVE_PEOPLE } from '../../graphql/queries'

const RemovePeople = ({ id }) => {
  const [removePeople] = useMutation(REMOVE_PEOPLE, {
    refetchQueries: [{ query: GET_PEOPLES }],
    awaitRefetchQueries: true
  })
  

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this People?')

    if (result) {
      removePeople({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemovePeople