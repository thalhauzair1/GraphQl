import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form, Input, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CARS_BY_PEOPLE, GET_PEOPLES } from '../../graphql/queries';

const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [people, setPeople] = useState([]);
  const [personId, setPersonId] = useState('');
  const [addCar] = useMutation(ADD_CAR);
  const { data } = useQuery(GET_PEOPLES);

  useEffect(() => {
    if (data && data.people) {
      setPeople(data.people);
    }
  }, [data]);

  const handleChange = value => {
    setPersonId(value);
  };


  const onFinish = values => {
    addCar({
      variables: {
        id,
        make: values.make,
        model: values.model,
        year: parseInt(values.year),
        price: parseFloat(values.price),
        personId
      },
      refetchQueries: [{ query: GET_CARS_BY_PEOPLE, variables: { personId } }]
    });
    form.resetFields();
  };  

  return (
    <Form
      name='add-car-form'
      layout='inline'
      size='large'
      style={{ marginBottom: '40px' }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please enter a make' }]}
      >
        <Input placeholder='i.e. Toyota' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please enter a model' }]}
      >
        <Input placeholder='i.e. Camry' />
      </Form.Item>
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input placeholder='i.e. 2020' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please enter a price' }]}
      >
        <Input placeholder='i.e. 20000' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select
          placeholder='Select a person'
          onChange={handleChange}
          allowClear
        >
          {people.map(person => (
            <Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Option>
          ))}
        </Select>
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
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
