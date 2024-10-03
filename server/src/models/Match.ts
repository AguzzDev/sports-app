import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    eventId: { type: String },
    homeTeam: { type: String },
    awayTeam: { type: String },
    homeTeamImg: { type: String },
    awayTeamImg: { type: String },
    result: { type: String },
    league: { type: String },
    status: { type: String },
    info: { type: String },
    lineup: { type: Object, default: {} },
    statistics: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
