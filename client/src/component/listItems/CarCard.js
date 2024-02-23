import { Card } from "antd"
import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from "../forms/UpdateCar"
import RemoveCar from "../Buttons/RemoveCar"

const CarCard = ({ car }) => {
    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()
    const { id, year, make, model, price, personId } = car

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }
    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >
                    {year} {make} {model} -{">"} ${price} 
                    
                </Card>
            )}
        </div>
    )

    

}

const getStyles = () => ({
    card: {
        width: '100%',
        textAlign: 'left',
        margin: '10px',
        backgroundColor: '#f0f0f0'
    }
})

export default CarCard