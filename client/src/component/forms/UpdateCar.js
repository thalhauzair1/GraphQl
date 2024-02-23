import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import {  GET_CARS_BY_PEOPLE, GET_PEOPLES, UPDATE_CAR } from "../../graphql/queries";
const { Option } = Select;

const UpdateCar = (props) => {
    const { id, year, make, model, price, personId } = props;
    const [form] = Form.useForm();
    const { data: peopleData } = useQuery(GET_PEOPLES);
    const [selectedPersonId, setSelectedPersonId] = useState(personId);
    const [updateCar] = useMutation(UPDATE_CAR, {
        refetchQueries: [
            { query: GET_CARS_BY_PEOPLE, variables: { personId: selectedPersonId } },
            { query: GET_CARS_BY_PEOPLE, variables: { personId } }
        ],
        onCompleted: () => {
            setSelectedPersonId(personId);
        }
    });
    

    useEffect(() => {
        if (peopleData && peopleData.people) {
            form.setFieldsValue({
                year,
                make,
                model,
                price,
                personId: selectedPersonId 
            });
        }
    }, [peopleData, selectedPersonId]); 

    const handleChange = value => {
        setSelectedPersonId(value);
    };

    const onFinish = values => {
        const { year, make, model, price } = values;

        updateCar({
            variables: {
                id,
                year: parseInt(year),
                make,
                model,
                price: parseFloat(price),
                personId: selectedPersonId
            }
        });

        props.onButtonClick();
    }

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please enter a year' }]}
            >
                <Input placeholder='i.e. 2020' />
            </Form.Item>
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
                name='price'
                rules={[{ required: true, message: 'Please enter a price' }]}
            >
                <Input placeholder='i.e. 25000' />
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
                    {peopleData && peopleData.people && peopleData.people.map(person => (
                        <Option key={person.id} value={person.id}>
                            {person.firstName} {person.lastName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
                <Button onClick={props.onButtonClick}>Cancel</Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateCar;
