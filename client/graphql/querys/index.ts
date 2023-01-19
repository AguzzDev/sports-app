import { gql } from "@apollo/client"

export const GET_LEAGUE = gql`
query GetLeague($league: String) {
  getLeague(league: $league) {
    title
    img
    ranking
    moreCups
    actuallyWinner
    playerMoreExpensive
    leagueCode
    logos{
      title
      img
    }
    topScorers {
      goals
      team
      positionIn
      player
      img
      position
    }
    table {
      points
      differenceGoal
      lose
      draw
      win
      games
      team
      img
      position
    }
    calendar {
      title
      tableAllData {
        date
        time
        localTeam
        localTeamImg
        result
        visitantTeamImg
        visitantTeam
      }
    }
  }
}
`

export const GET_LEAGUES = gql`
query GetAllLeagues {
  getAllLeagues {
    title
    img
  }
}
`
export const GET_RANDOM_PLAYER= gql`
query GetRandomPlayer {
  getRandomPlayer {
    name
    img
    team
    teamImg
    league
    position
    marketValue
  }
}
`
export const GET_TEAM = gql`
query GetTeam($team: String) {
  getTeam(team: $team) {
    info {
      title
      img
      league
      stadium
      balance
      marketValue
    }
    titles {
      title
      img
      teamAndYear
      years
    }
    squad {
      number
      name
      img
      position
      age
      nationality {
        img
      }
      contract
      marketValue
    }
    schedule {
      game
      date
      time
      locality
      rivalImg
      rival
      result
    }
  }
}
`