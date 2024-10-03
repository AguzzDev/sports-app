"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.LeagueDef = (0, apollo_server_express_1.gql) `
  type League {
    name: String
    img: String
    numPlayer: String
    numPlayerForeign: String
    marketValue: String
    playerMoreExpensive: String
    topScorers: [Scorers]
    table: [Table]
    calendar: [Calendar]
  }
  type Scorers {
    position: String
    img: String
    player: String
    positionIn: String
    team: String
    goals: String
  }
  type Calendar {
    title: String
    tableAllData: [TableCalendarData]
  }
  type TableCalendarData {
    date: String
    time: String
    localTeam: String
    localTeamImg: String
    result: String
    visitantTeamImg: String
    visitantTeam: String
  }
  type Table {
    position: String
    img: String
    team: String
    games: String
    win: String
    draw: String
    lose: String
    differenceGoal: String
    points: String
  }

  type Query {
    getLeagues: [League]
    getLeague(league: String): League
  }
`;
