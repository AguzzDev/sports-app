"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamResolver = void 0;
const Team_1 = __importDefault(require("../models/Team"));
exports.TeamResolver = {
    Query: {
        getTeams: async (_, args) => {
            const results = await Team_1.default.find({ "info.league": args.league });
            return results;
        },
        getTeam: async (_, args) => {
            const result = await Team_1.default.findOne({ "info.name": args.team })
                .populate("squad")
                .exec();
            return result;
        },
    },
};
