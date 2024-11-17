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
const employeeResolver = {
    Query: {
        getEmployees: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                return (_a = yield context.collection('employees').find().toArray()) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.log(error);
            }
        })
    },
    Mutation: {
        createEmployee: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const reg_ex = new RegExp((_a = args === null || args === void 0 ? void 0 : args.employee) === null || _a === void 0 ? void 0 : _a.name, 'i');
                const employeeColl = yield context.collection('employees').findOne({ name: reg_ex });
                console.log(employeeColl);
                if (employeeColl)
                    throw new Error("Employee already exists");
                yield context.collection('employees').insertOne(args.employee);
                return "Employee created successfully";
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        updateEmployee: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { input } = args;
                const employeeColl = yield context.collection('employees').findOne({ _id: new mongodb_1.ObjectId(args._id) });
                if (!employeeColl)
                    throw new Error("Employee not found");
                yield context.collection('employees').updateOne({ _id: new mongodb_1.ObjectId(args._id) }, { $set: args.employee });
                return "Employee updated successfully";
            }
            catch (error) {
                console.log(error);
            }
        }),
    },
    Employee: {
        skills(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const skillsList = parent.skills.map((id) => __awaiter(this, void 0, void 0, function* () {
                        return yield context.collection('Skills').findOne({ _id: new mongodb_1.ObjectId(id.toString()) });
                    }));
                    return skillsList;
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
    }
};
exports.default = employeeResolver;
