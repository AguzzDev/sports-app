import Team from "../../models/Team"

export const TeamResolver = {
  Query: {
    getAllTeams: async (_: void, args: { league: string }) => {
      const results = await Team.find({ "info.title": args.league })
      return results
    },
    getTeam: async (_: void, args: { team: string }) => {
      const result = await Team.findOne({ "info.title": args.team })
      return result
    }
  }
}