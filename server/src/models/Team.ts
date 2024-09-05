import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  info: {
    name: { type: String },
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
  squad: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
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
});

export default mongoose.model("Team", TeamSchema);
