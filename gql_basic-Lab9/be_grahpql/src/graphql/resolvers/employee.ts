import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const employeeResolver: IResolvers = {
    Query: {
        getEmployees: async (parent, args, context: { db: Db }) => { 
            try {
                return await context.db.collection('employees').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createEmployee: async (parent, args, context: { db: Db }) => {  
            try {
                const reg_ex = new RegExp(args?.employee?.name, 'i');
                const employeeColl = await context.db.collection('employees').findOne({ name: reg_ex });
                console.log(employeeColl);
                if (employeeColl) throw new Error("Employee already exists");

                await context.db.collection('employees').insertOne(args.employee);
                return "Employee created successfully";
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        updateEmployee: async (parent, args, context: { db: Db }) => {  
            try {
                const { input } = args;
                const employeeColl = await context.db.collection('employees').findOne({ _id: new ObjectId(args._id) });
                if (!employeeColl) throw new Error("Employee not found");

                await context.db.collection('employees').updateOne(
                    { _id: new ObjectId(args._id) },
                    { $set: args.employee }
                );

                return "Employee updated successfully";
            } catch (error) {
                console.log(error);
            }
        }
    },
    Employee: {
        async skills(parent, args, context: { db: Db }) { 
            try {
                const skillsList = parent.skills.map(async (id: string) => {
                    return await context.db.collection('Skills').findOne({ _id: new ObjectId(id.toString()) });
                });
                return skillsList;

            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default employeeResolver;
