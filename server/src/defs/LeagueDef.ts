import { gql } from "apollo-server-express"

export const LeagueDef = gql`
  type League {
    title: String
    img: String
    ranking: String
    moreCups: String
    actuallyWinner: String
    playerMoreExpensive: String
    leagueCode: String
    topScorers: [Scorers]
    table: [Table]
    calendar: [Calendar]
    logos: [Logos]
  }
  type Logos{
    title: String
    img: String
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
    getAllLeagues: [League]
    getLeague(league:String): League
  }
`
