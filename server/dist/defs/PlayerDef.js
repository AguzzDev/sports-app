"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.playerDef = (0, apollo_server_express_1.gql) `
  type Player {
    name: String
    number: String
    img: String
    birth: String
    placeToBirth: String
    nacionality: String
    height: String
    position: String
    nationalTeam: String
    matches: String
    marketValue: String
    team: String
    teamImg: String
    league: String
    stats: [Stats]
    info: [Info]
    titles: [Titles]
  }
  type Stats {
    field: String
    value: String
  }
  type Info {
    title: String
    text: String
  }
  type Titles {
    title: String
    img: String
    teamAndYear: String
  }

  type Query {
    getRandomPlayer: [Player]
    getOnePlayer(player: String): Player
    getPlayersForPosition(player: String, position: String): [Player]
    getPlayersForLeague(player: String, league: String): [Player]
    getPlayers(league: String): [Player]
  }
`;
