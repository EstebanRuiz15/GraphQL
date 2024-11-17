"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartoonsdata_1 = require("../../data/cartoonsdata");
const cartoonsResolver = {
    Query: {
        getCartoons() {
            return cartoonsdata_1.CartoonDataSource;
        }
    }
};
exports.default = cartoonsResolver;
