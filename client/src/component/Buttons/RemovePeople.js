import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import filter from 'lodash.filter'
import { GET_PEOPLES, REMOVE_PEOPLE } from '../../graphql/queries'

const RemovePeople = ({ id }) => {
  const [removePeople] = useMutation(REMOVE_PEOPLE, {
    update(cache, { data: { removePeople } }) {
      const { peoples } = cache.readQuery({ query: GET_PEOPLES })

      cache.writeQuery({
        query: GET_PEOPLES,
        data: {
            peoples: filter(peoples, c => {
            return c.id !== removePeople.id
          })
        }
      })
    }
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