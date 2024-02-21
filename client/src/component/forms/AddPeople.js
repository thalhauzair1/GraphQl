import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { Add_PEOPLE, GET_PEOPLES } from '../../graphql/queries'


const AddPeople = () => {

  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [addPeople] = useMutation(Add_PEOPLE)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values


    addPeople({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPeople } }) => {
        const data = cache.readQuery({ query: GET_PEOPLES })
        console.log(data);

        const newPerson = {
          id: addPeople.id,
          firstName: addPeople.firstName,
          lastName: addPeople.lastName
        };

       cache.writeQuery({
          query: GET_PEOPLES,
          data: { people: [...data.people, newPerson] }
        })
        
        
      }
    })

    form.resetFields()
  }
  

  

return (
    <Form
    name='add-people-form'
    layout='inline'
    size='large'
    style={{ marginBottom: '40px' }}
    form={form}
    onFinish={onFinish}
  >
    <Form.Item
      name='firstName'
      rules={[{ required: true, message: 'Please enter a first name' }]}
    >
      <Input placeholder='i.e. John' />
    </Form.Item>
    <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
      <Input placeholder='i.e. Smith' />
    </Form.Item>
    <Form.Item shouldUpdate={true}>
      {() => (
        <Button
          type='primary'
          htmlType='submit'
          disabled={
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length
          }
        >
          Add People
        </Button>
      )}
    </Form.Item>
  </Form>)
}

export default AddPeople