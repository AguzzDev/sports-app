import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema({
  info: {
    title: { type: String },
    img: { type: String },
    league: { type: String },
    stadium: { type: String },
    balance: { type: String },
    marketValue: { type: String },
  },
  titles: [
    {
      title: { type: String },
      img: { type: String },
      years: { type: String },
    },
  ],
  squad: [
    {
      number: { type: String },
      name: { type: String },
      position: { type: String },
      img: { type: String },
      age: { type: String },
      nationality: [{ type: Array }],
      contract: { type: String },
      marketValue: { type: String },
    },
  ],
  schedule: [
    {
      game: { type: String },
      date: { type: String },
      time: { type: String },
      locality: { type: String },
      rivalImg: { type: String },
      rival: { type: String },
      result: { type: String },
    },
  ],
})

export default mongoose.model("Team", PlayerSchema)
