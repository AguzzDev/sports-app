"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GamesSchema = new mongoose_1.default.Schema({
    localTeam: { type: String },
    visitantTeam: { type: String },
    localTeamImg: { type: String },
    visitantTeamImg: { type: String },
    result: { type: String },
    league: { type: String },
    status: { type: String },
    info: { type: String },
});
exports.default = mongoose_1.default.model("Games", GamesSchema);
