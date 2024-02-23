import find from "lodash.find"
import remove from "lodash.remove"

const peopleArray = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const carArray = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = `
  type People {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!

  }
  
  type Query {
    people: [People]
    car: [Car]
    carsOwnedByPeople(personId: String!): [Car]
  }

  type Mutation {
    addPeople(id:String!, firstName:String!, lastName:String!): People
    updatePeople(id:String!, firstName:String!, lastName:String!): People
    removePeople(id:String!): People
    addCar(id:String!, year:Int!, make:String!, model:String!, price:Float!,personId:String): Car
    updateCar(id:String!, year:Int!, make:String!, model:String!, price:Float!, personId:String): Car
    removeCarByPersonId(id:String!) : Car

  }
  `

const resolvers = {
  Query: {
    people: () => peopleArray,
    car: () => carArray,
    carsOwnedByPeople: (parent, args) => {
      if (!args.personId) {
        throw new Error("personId parameter is required for carsOwnedByPeople query");
      }
      return carArray.filter(car => car.personId === args.personId);
    }
  },
  Mutation: {
    addPeople: (root, args) => {
      const newPeople = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      peopleArray.push(newPeople)

      return newPeople
    },
    updatePeople: (root, args) => {
      const people = find(peopleArray, { id: args.id })
      if (!people) {
        throw new Error("no people")
      }
      people.firstName = args.firstName
      people.lastName = args.lastName

      return people

    },
    removePeople: (root, args) => {
      const removePeople = find(peopleArray, { id: args.id })
      if (!removePeople) {
        throw new Error("no people")
      }
      remove(peopleArray, c => {
        return c.id === removePeople.id
      })

      return removePeople
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,   
        personId: args.personId}
      carArray.push(newCar)

      return newCar
    },

    updateCar: (root, args) => {
      const updateCar = find(carArray, { id: args.id })
      if (!updateCar) {
        throw new Error("no Car")
      }
      updateCar.make = args.make
      updateCar.model = args.model
      updateCar.price = args.price
      updateCar.year = args.year
      updateCar.personId = args.personId

      return updateCar

    },
    removeCarByPersonId: (root, args) => {
      const removeCarByPersonId = find(carArray, { id: args.id })
      if (!removeCarByPersonId) {
        console.log(removeCarByPersonId)
        throw new Error("no car for person ")
      }
      remove(carArray, c => {
        return c.id === removeCarByPersonId.id
      })
      return removeCarByPersonId
    }
  }
}

export { typeDefs, resolvers }