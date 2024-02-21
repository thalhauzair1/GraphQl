const CarsPeopleOwnedCard = ({ props }) => {
    const styles = getStyles()
    const { id, make, model, year } = props
    
    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            <Card
                style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                    <RemovePeople id={id} />
                ]}
            >
                {make} {model} {year}
            </Card>
        </div>
    )
}
const getStyles = () => ({
    card: {
        width: '500px'
    }
})

export default CarsPeopleOwnedCard