"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
require("graphql-import-node");
const cartoons_graphql_1 = __importDefault(require("./schemas/cartoons.graphql"));
const people_graphql_1 = __importDefault(require("./schemas/people.graphql"));
const skill_graphql_1 = __importDefault(require("./schemas/skill.graphql"));
const employee_graphql_1 = __importDefault(require("./schemas/employee.graphql"));
const users_graphql_1 = __importDefault(require("./schemas/users.graphql"));
const posts_graphql_1 = __importDefault(require("./schemas/posts.graphql"));
const schema_1 = require("@graphql-tools/schema");
const graphql_tools_merge_typedefs_1 = __importDefault(require("graphql-tools-merge-typedefs"));
const cartoons_1 = __importDefault(require("./resolvers/cartoons"));
const people_1 = __importDefault(require("./resolvers/people"));
const employee_1 = __importDefault(require("./resolvers/employee"));
const skill_1 = __importDefault(require("./resolvers/skill"));
const user_1 = __importDefault(require("./resolvers/user"));
const posts_1 = __importDefault(require("./resolvers/posts"));
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: (0, graphql_tools_merge_typedefs_1.default)([
        cartoons_graphql_1.default,
        people_graphql_1.default,
        employee_graphql_1.default,
        skill_graphql_1.default,
        users_graphql_1.default, posts_graphql_1.default
    ]),
    resolvers: [cartoons_1.default, people_1.default, employee_1.default, skill_1.default, user_1.default, posts_1.default]
});
