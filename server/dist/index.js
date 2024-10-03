"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const LeagueResolver_1 = require("./resolvers/LeagueResolver");
const LeagueDef_1 = require("./defs/LeagueDef");
const PlayerResolver_1 = require("./resolvers/PlayerResolver");
const PlayerDef_1 = require("./defs/PlayerDef");
const TeamDefs_1 = require("./defs/TeamDefs");
const TeamsResolver_1 = require("./resolvers/TeamsResolver");
const GamesResolver_1 = require("./resolvers/GamesResolver");
const GamesDef_1 = require("./defs/GamesDef");
const scrapping_1 = __importDefault(require("./modules/scrapping"));
(async () => {
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    }));
    app.get("/", (_, res) => res.send("API ON"));
    mongoose_1.default
        .connect(process.env.MONGO_URL)
        .then(() => console.log("DB Connection Successfull!"))
        .catch((err) => {
        console.log(err);
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: [LeagueDef_1.LeagueDef, PlayerDef_1.playerDef, TeamDefs_1.TeamDef, GamesDef_1.GamesDef],
        resolvers: [LeagueResolver_1.LeagueResolver, PlayerResolver_1.PlayerResolver, TeamsResolver_1.TeamResolver, GamesResolver_1.GamesResolver],
        csrfPrevention: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
    });
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server on ${PORT}`);
        (0, scrapping_1.default)();
    });
})();
