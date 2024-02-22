import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
    const { id, year, make, model, price } = props;
    const [updateCar] = useMutation(UPDATE_CAR);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    const onFinish = values => {
        const { year, make, model, price } = values;

        updateCar({
            variables: {
                id,
                year: parseInt(year),
                make,
                model,
                price: parseFloat(price)
            }
        })

        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
    }, [])

    return (
        <Form
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year,
                make,
                model,
                price
            }}
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
            <Button htmlType='submit'>Update</Button>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}
    

    export default UpdateCar
