import mongoose from "mongoose"

const LeagueSchema = new mongoose.Schema({
  title: { type: String },
  img: { type: String },
  ranking: { type: String },
  moreCups: { type: String },
  actuallyWinner: { type: String },
  playerMoreExpensive: { type: String },
  logos: [
    {
      title: { type: String },
      img: { type: String },
    },
  ],
  leagueCode: { type: String },
  topScorers: [
    {
      position: { type: String },
      img: { type: String },
      player: { type: String },
      positionIn: { type: String },
      team: { type: String },
      goals: { type: String },
    },
  ],
  table: [
    {
      position: { type: String },
      img: { type: String },
      team: { type: String },
      games: { type: String },
      win: { type: String },
      draw: { type: String },
      lose: { type: String },
      differenceGoal: { type: String },
      points: { type: String },
    },
  ],
  calendar: [
    {
      title: { type: String },
      tableAllData: [
        {
          date: { type: String },
          time: { type: String },
          localTeam: { type: String },
          localTeamImg: { type: String },
          result: { type: String },
          visitantTeamImg: { type: String },
          visitantTeam: { type: String },
        },
      ],
    },
  ],
})

export default mongoose.model("League", LeagueSchema)
