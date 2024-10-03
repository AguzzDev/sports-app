"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerResolver = void 0;
const utils_1 = require("../utils");
const Player_1 = __importDefault(require("../models/Player"));
exports.PlayerResolver = {
    Query: {
        getRandomPlayer: async () => {
            const allPlayers = await Player_1.default.find();
            const random = Math.floor(Math.random() * allPlayers.length - 1);
            const random2 = Math.floor(Math.random() * allPlayers.length - 1);
            const data = [allPlayers[random], allPlayers[random2]];
            return data;
        },
        getOnePlayer: async (_, args) => {
            return await Player_1.default.findOne({
                name: { $regex: (0, utils_1.diacriticSensitiveRegex)(args.player), $options: "i" },
            });
        },
        getPlayersForPosition: async (_, args) => {
            return await Player_1.default.find({
                name: { $regex: (0, utils_1.diacriticSensitiveRegex)(args.player), $options: "i" },
                position: { $eq: args.position },
            });
        },
        getPlayersForLeague: async (_, args) => {
            return await Player_1.default.find({
                name: { $regex: (0, utils_1.diacriticSensitiveRegex)(args.player), $options: "i" },
                league: { $eq: args.league },
            });
        },
    },
};
