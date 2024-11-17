"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const cartoons_1 = __importDefault(require("./cartoons"));
const people_1 = __importDefault(require("./people"));
const employee_1 = __importDefault(require("./employee"));
const resolver = graphql_merge_resolvers_1.default.merge({
    cartoons: cartoons_1.default,
    people: people_1.default,
    employee: employee_1.default
});
exports.default = resolver;
