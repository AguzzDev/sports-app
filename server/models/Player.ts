import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema({
  name: { type: String },
  img: { type: String },
  team: { type: String },
  teamImg: { type: String },
  league: { type: String },
  position: { type: String },
  stats: [
    {
      field: { type: String },
      value: { type: String },
    },
  ],
  info: [
    {
      title: { type: String },
      text: { type: String },
    },
  ],
  marketValue: { type: String },
  titles: [
    {
      title: { type: String },
      img: { type: String },
      teamAndYear: { type: String },
    },
  ],
})

export default mongoose.model("Player", PlayerSchema)
