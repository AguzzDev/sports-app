"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueResolver = void 0;
const League_1 = __importDefault(require("../models/League"));
exports.LeagueResolver = {
    Query: {
        getLeagues: async () => {
            const results = await League_1.default.find();
            return results;
        },
        getLeague: async (_, args) => {
            const result = await League_1.default.findOne({ name: args.league });
            return result;
        },
    },
};
