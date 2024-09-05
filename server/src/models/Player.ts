import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: { type: String },
  number: { type: String },
  img: { type: String },
  birth: { type: String },
  placeToBirth: { type: String },
  nacionality: { type: String },
  height: { type: String },
  position: { type: String },
  nationalTeam: { type: String },
  matches: { type: String },
  marketValue: { type: String },
  team: { type: String },
  teamImg: { type: String },
  league: { type: String },
  stats: [
    {
      field: { type: String },
      value: { type: String },
    },
  ],
  titles: [
    {
      title: { type: String },
      img: { type: String },
      year: {
        year: { type: String },
        team: { type: String },
        teamImg: { type: String },
      },
    },
  ],
});

export default mongoose.model("Player", PlayerSchema);
