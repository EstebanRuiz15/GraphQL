import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const CreateToken = (user: any, secret: jwt.Secret, expiration: any) => {
    const { _id, email, name, lastname } = user;
    return jwt.sign({ _id, email, name, lastname }, secret, { expiresIn: expiration })
}

interface UserInput {
    name?: string;
    email?: string;
    password?: string;
}

const userResolver: IResolvers = {
    Query: {
        getUser: async (parent, args, context: { db: Db }) => {
            try {
                return await context.db.collection('users').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        },
        getUserById: async (parent, args, context: { db: Db }) => { 
            try {
                return await context.db.collection('users').findOne({ _id: new ObjectId(args._id) });
            } catch (error) {
                console.log(error);
            }
        },
        getCurrentUser: async (parent, args, context: { db: Db }) => { 
            const token = args?.token;
            if (!token) throw new Error("Token not provided");
            try {
                const user: any = jwt.verify(token, "abc.123");
                return await context.db.collection('users').findOne({ _id: new ObjectId(user?._id) });
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createUser: async (parent, args, context: { db: Db }) => {
            try {
                await context.db.collection('users').insertOne(args.userInput);
                return "User created successfully";
            } catch (error) {
                console.log(error);
            }
        },
        updateUser: async (parent, args, context: { db: Db }) => { 
            try {
                console.log("Arguments received:", args);

                const { _id, userInput } = args;

                if (!_id || !userInput) {
                    throw new Error("Invalid input: _id or userInput is missing");
                }
                const userColl = await context.db.collection('users').findOne({ _id: new ObjectId(_id) });

                if (!userColl) {
                    throw new Error("User not found");
                }

                const updateFields: Partial<UserInput> = {};
                if (userInput.name) updateFields['name'] = userInput.name;
                if (userInput.email) updateFields['email'] = userInput.email;
                if (userInput.password) updateFields['password'] = userInput.password;

                if (Object.keys(updateFields).length === 0) {
                    throw new Error("No valid fields provided for update");
                }

                const result = await context.db.collection('users').updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updateFields }
                );

                if (result.modifiedCount === 0) {
                    throw new Error("No changes made to the user");
                }

                return "User updated successfully";
            } catch (error) {
                console.error("Error updating user:", error instanceof Error ? error.message : error);
                return error instanceof Error ? error.message : "An unknown error occurred";
            }
        },
        authUser: async (parent, args, context: { db: Db }) => {
            const { email, password } = args?.authInput;
            const userColl = await context.db.collection('users').findOne({ email: email, password: password });
            if (!userColl) throw new Error("User or password incorrect");
            return {
                token: CreateToken(userColl, "abc.123", '24h')
            }
        }
    }
};

export default userResolver;
