import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const skillResolver: IResolvers = {
    Query: {
        getSkills: async (parent, args, context: { db: Db }) => { 
            try {
                return await context.db.collection('Skills').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        }       
    },
    Mutation: {
        createSkill: async (parent, args, context: { db: Db }) => { 
            try {
                await context.db.collection('Skills').insertOne(args.skill);
                return "Skill created successfully";
            } catch (error) {
                console.log(error);
            }
        },
        updateSkill: async (parent, args, context: { db: Db }) => { 
            try {
                console.log(args);
                const skillColl = await context.db.collection('Skills').findOne({ _id: new ObjectId(args._id) });

                if (!skillColl) throw new Error("Skill not found");
                console.log("Validating skillColl");

                await context.db.collection('Skills').updateOne(
                    { _id: new ObjectId(args._id) },
                    { $set: args.skill }
                );

                return "Skill updated successfully";
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default skillResolver;
