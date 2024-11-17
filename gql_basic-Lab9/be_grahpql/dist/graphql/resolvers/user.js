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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateToken = (user, secret, expiration) => {
    const { _id, email, name, lastname } = user;
    return jsonwebtoken_1.default.sign({ _id, email, name, lastname }, secret, { expiresIn: expiration });
};
const userResolver = {
    Query: {
        getUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                return (_a = yield context.collection('users').find().toArray()) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.log(error);
            }
        }),
        getUserById: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield context.collection('users').findOne({ _id: new mongodb_1.ObjectId(args._id) });
            }
            catch (error) {
                console.log(error);
            }
        }),
        getCurrentUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const token = args === null || args === void 0 ? void 0 : args.token;
            if (!token)
                throw new Error("Token not provided");
            try {
                const user = jsonwebtoken_1.default.verify(token, "abc.123");
                return yield context.collection('users').findOne({ _id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user._id) });
            }
            catch (error) {
                console.log(error);
            }
        })
    },
    Mutation: {
        createUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield context.collection('users').insertOne(args.userInput);
                return "User created successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
        updateUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(args);
                const userColl = yield context.collection('users').findOne({ _id: new mongodb_1.ObjectId(args._id) });
                if (!userColl)
                    throw new Error("User not found");
                yield context.collection('user').updateOne({ _id: new mongodb_1.ObjectId(args._id) }, { $set: args.user });
                return "User updated successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
        authUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args === null || args === void 0 ? void 0 : args.authInput;
            const userColl = yield context.collection('users').findOne({ email: email, password: password });
            if (!userColl)
                throw new Error("User or password incorrect");
            return {
                token: CreateToken(userColl, "abc.123", '24h')
            };
        })
    }
};
exports.default = userResolver;
