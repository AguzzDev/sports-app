"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PlayerSchema = new mongoose_1.default.Schema({
    name: { type: String },
    number: { type: String },
    img: { type: String },
    birth: { type: String },
    placeToBirth: { type: String },
    nacionality: { type: String },
    height: { type: String },
    position: { type: String },
    nationalTeam: { type: String },
    matches: { type: String },
    marketValue: { type: String },
    team: { type: String },
    teamImg: { type: String },
    league: { type: String },
    stats: [
        {
            field: { type: String },
            value: { type: String },
        },
    ],
    titles: [
        {
            title: { type: String },
            img: { type: String },
            year: {
                year: { type: String },
                team: { type: String },
                teamImg: { type: String },
            },
        },
    ],
});
exports.default = mongoose_1.default.model("Player", PlayerSchema);
