"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const skillResolver = {
    Query: {
        getSkills: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                return (_a = yield context.collection('Skills').find().toArray()) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.log(error);
            }
        })
    },
    Mutation: {
        createSkill: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield context.collection('Skills').insertOne(args.skill);
                return "Skill created successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
        updateSkill: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(args);
                const skillColl = yield context.collection('Skills').findOne({ _id: new mongodb_1.ObjectId(args._id) });
                if (!skillColl)
                    throw new Error("Skills not found");
                console.log("validando skillColl");
                yield context.collection('Skills').updateOne({ _id: new mongodb_1.ObjectId(args._id) }, { $set: args.skill });
                return "Skill updated successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
    }
};
exports.default = skillResolver;
