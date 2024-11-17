import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';
import { peopleDataSource } from '../../data/peopledata';

const peopleResolver: IResolvers = {
    Query: {
        getPeopleInMongo: async (parent, args, context: { db: Db }) => {  
            try {
                return await context.db.collection('people').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        },
        getPeople: () => peopleDataSource,
        getPersonByName: (parent, { name }) => {
            return peopleDataSource.filter(person => person.name.toLowerCase().includes(name.toLowerCase()));
        }
    },
    Mutation: {
        createPersonInMongo: async (root: void, args: any, context: { db: Db }) => {  
            try {
                const person = await context.db.collection('people').insertOne(args.person);
                return "Person created successfully";
            } catch (error) {
                console.log(error);
            }
        },
        createPerson: (parent, { input }) => {
            const newPerson = {
                _id: String(peopleDataSource.length + 1),
                ...input
            };
            peopleDataSource.push(newPerson);
            return newPerson;
        },
        updatePerson: (parent, { _id, input }) => {
            const personIndex = peopleDataSource.findIndex(person => person._id === _id);
            if (personIndex !== -1) {
                const updatedPerson = {
                    _id,
                    ...input
                };
                peopleDataSource[personIndex] = updatedPerson;
                return updatedPerson;
            }
            throw new Error("Person not found");
        },
        deletePerson: (parent, { _id }) => {
            const personIndex = peopleDataSource.findIndex(person => person._id === _id);
            if (personIndex !== -1) {
                peopleDataSource.splice(personIndex, 1);
                return true;
            }
            throw new Error("Person not found");
        }
    }
}

export default peopleResolver;
