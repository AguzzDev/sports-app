import League from "../../models/League";

export const LeagueResolver = {
  Query: {
    getAllLeagues: async () => {
      const results = await League.find();
      return results;
    },
    getLeague: async (_: void, args: { league: string }) => {
      const result = await League.findOne({ title: args.league });
      return result;
    },
  },
};
