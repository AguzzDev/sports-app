"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.GamesDef = (0, apollo_server_express_1.gql) `
  type Games {
    localTeam: String
    visitantTeam: String
    localTeamImg: String
    visitantTeamImg: String
    result: String
    league: String
    status: String
    info: String
  }

  type Query {
    getGames: [Games]
  }
`;
