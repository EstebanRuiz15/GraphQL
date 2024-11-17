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
const peopledata_1 = require("../../data/peopledata");
const peopleResolver = {
    Query: {
        getPeopleInMongo: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                return (_a = yield context.collection('people').find().toArray()) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.log(error);
            }
        }),
        getPeople: () => peopledata_1.peopleDataSource,
        getPersonByName: (parent, { name }) => {
            return peopledata_1.peopleDataSource.filter(peopleDataSource => peopleDataSource.name.toLowerCase().includes(name.toLowerCase()));
        }
    },
    Mutation: {
        createPersonInMongo: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const person = yield context.collection('people').insertOne(args.person);
                return "Person created successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
        createPerson: (parent, { input }) => {
            const newPerson = Object.assign({ _id: String(peopledata_1.peopleDataSource.length + 1) }, input);
            peopledata_1.peopleDataSource.push(newPerson);
            return newPerson;
        },
        updatePerson: (parent, { _id, input }) => {
            const personIndex = peopledata_1.peopleDataSource.findIndex(person => person._id === _id);
            if (personIndex !== -1) {
                const updatedPerson = Object.assign({ _id }, input);
                peopledata_1.peopleDataSource[personIndex] = updatedPerson;
                return updatedPerson;
            }
            throw new Error("Person not found");
        },
        deletePerson: (parent, { _id }) => {
            const personIndex = peopledata_1.peopleDataSource.findIndex(person => person._id === _id);
            if (personIndex !== -1) {
                peopledata_1.peopleDataSource.splice(personIndex, 1);
                return true;
            }
            throw new Error("Person not found");
        }
    }
};
exports.default = peopleResolver;
