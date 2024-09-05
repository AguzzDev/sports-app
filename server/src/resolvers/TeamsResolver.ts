import Team from "../models/Team";

export const TeamResolver = {
  Query: {
    getTeams: async (_: void, args: { league: string }) => {
      const results = await Team.find({ "info.league": args.league });

      return results;
    },
    getTeam: async (_: void, args: { team: string }) => {
      const result = await Team.findOne({ "info.name": args.team })
        .populate("squad")
        .exec();
      return result;
    },
  },
};
