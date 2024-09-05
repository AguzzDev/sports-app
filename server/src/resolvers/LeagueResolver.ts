import League from "../models/League";

export const LeagueResolver = {
  Query: {
    getLeagues: async () => {
      const results = await League.find();
      return results;
    },
    getLeague: async (_: void, args: { league: string }) => {
      const result = await League.findOne({ name: args.league });
      return result;
    },
  },
};
