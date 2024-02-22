const Title = () =>{
    const styles = getStyles()
    return(
        <div style={styles.title}>
            <h1>People and their Cars</h1>
        </div>
    )
}

const getStyles =() =>({
    title: {
        fontSize: 30,
        padding:'10px',
        margin:'5px'

    }

})

export default Title;