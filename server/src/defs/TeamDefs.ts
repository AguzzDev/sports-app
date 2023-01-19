import { gql } from "apollo-server-express"

export const TeamDef = gql`
  type Team {
    info: Info
    titles: [Titles]
    squad: [Squad]
    schedule: [Schedule]
  }
  type Info {
    title: String
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
    age: String
    nationality: [Nacionality]
    contract: String
    marketValue: String
  }
  type Nacionality{
    img: String
  }
  type Schedule{
    game: String
    date: String
    time: String
    locality: String
    rivalImg: String
    rival: String
    result: String
  }

  type Query{
    getAllTeams(league:String): [Team]
    getTeam(team:String): Team
  }
`
