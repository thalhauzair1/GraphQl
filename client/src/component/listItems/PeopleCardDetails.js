import React from "react";

const PeopleCardDetails = ({match}) => {

    const { id } = match.params


    return (
        <div>
            <h1>People Details</h1>
            <h2>{id}</h2>
        </div>
    )
}
export default PeopleCardDetails