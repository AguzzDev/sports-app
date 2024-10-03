"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TeamSchema = new mongoose_1.default.Schema({
    info: {
        name: { type: String },
        img: { type: String },
        league: { type: String },
        stadium: { type: String },
        balance: { type: String },
        marketValue: { type: String },
    },
    titles: [
        {
            title: { type: String },
            img: { type: String },
            years: { type: String },
        },
    ],
    squad: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Player" }],
    schedule: [
        {
            game: { type: String },
            date: { type: String },
            time: { type: String },
            locality: { type: String },
            rivalImg: { type: String },
            rival: { type: String },
            result: { type: String },
        },
    ],
});
exports.default = mongoose_1.default.model("Team", TeamSchema);
