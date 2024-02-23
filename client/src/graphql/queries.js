import { gql } from "@apollo/client";


export const GET_PEOPLES = gql`
{
people{
    id
    firstName
    lastName
}
}

`
export const Add_PEOPLE = gql`
mutation AddPeople($id: String!, $firstName: String!, $lastName: String!) {
  addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}`
export const REMOVE_PEOPLE = gql`
  mutation RemovePeople($id: String!) {
    removePeople(id: $id) {
      id
      firstName
      lastName
    }
  }`

  
export const UPDATE_PEOPLE = gql`
mutation UpdatePeople($id: String!, $firstName: String!, $lastName: String!) {
  updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}`

export const ADD_CAR = gql`
mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
  addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
    id
    year
    make
    model
    price
    personId
  }
}`


export const GET_CAR = gql`
{
car{
    id
    make
    model
    year
    price
}

}
`

export const GET_CARS_BY_PEOPLE = gql`
query CarsOwnedByPeople($personId: ID!){
  carsOwnedByPeople(personId: $personId){
    id
    make
    model
    year
    price
    personId
  }
}
`

export const REMOVE_CAR = gql`
mutation RemoveCar($id: String!) {
  removeCarByPersonId(id: $id) {
    id
    make
    model
    year
    price
    personId
  }
}`

export const UPDATE_CAR = gql`
mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
  updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
    id
    year
    make
    model
    price
    personId
  }
}`
