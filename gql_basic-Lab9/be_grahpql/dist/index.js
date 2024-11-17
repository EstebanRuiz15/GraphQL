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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("./graphql");
const apollo_server_core_1 = require("apollo-server-core");
const mongo_1 = __importDefault(require("./mongo"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = new apollo_server_express_1.ApolloServer({
    schema: graphql_1.schema,
    introspection: true,
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()
    ],
    context: () => __awaiter(void 0, void 0, void 0, function* () { return new mongo_1.default().connect(); })
});
server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
});
