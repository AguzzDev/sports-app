"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.TeamDef = (0, apollo_server_express_1.gql) `
  type Team {
    info: Info
    titles: [Titles]
    squad: [Squad]
    schedule: [Schedule]
  }
  type Info {
    name: String
    img: String
    league: String
    stadium: String
    balance: String
    marketValue: String
  }
  type Titles {
    title: String
    img: String
    years: String
  }
  type Squad {
    number: String
    name: String
    position: String
    img: String
    nationality: String
    marketValue: String
  }
  type Schedule {
    game: String
    date: String
    time: String
    locality: String
    rivalImg: String
    rival: String
    result: String
  }

  type Query {
    getTeams(league: String): [Team]
    getTeam(team: String): Team
  }
`;
