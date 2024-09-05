import { gql } from "apollo-server-express";

export const playerDef = gql`
  type Player {
    name: String
    number: String
    img: String
    birth: String
    placeToBirth: String
    nationality: String
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
  }
`;
