import { gql } from "apollo-server-express";

export const MatchDef = gql`
  type Match {
    eventId: String
    homeTeam: String
    awayTeam: String
    homeTeamImg: String
    awayTeamImg: String
    result: String
    league: String
    status: String
    info: String
    lineup: Lineup
    statistics: [Statistics]
  }
  type Lineup {
    homeTeam: TeamLineup
    awayTeam: TeamLineup
  }
  type TeamLineup {
    lineup: String
    titular: [Player]
    substitutes: [Player]
  }
  type Player {
    name: String
    image: String
    number: String
    pos: String
  }
  type Statistics {
    text: String
    homeTeam: InfoStatistics
    awayTeam: InfoStatistics
  }
  type InfoStatistics {
    quantity: String
    percentage: String
  }

  type Query {
    getMatches: [Match]
  }
  type Subscription {
    getMatches: [Match]
  }
`;
