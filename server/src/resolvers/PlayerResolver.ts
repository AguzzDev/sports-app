import { diacriticSensitiveRegex } from "../utils";
import Player from "../models/Player";

export const PlayerResolver = {
  Query: {
    getRandomPlayer: async () => {
      const allPlayers = await Player.find();
      const random = Math.floor(Math.random() * allPlayers.length - 1);
      const random2 = Math.floor(Math.random() * allPlayers.length - 1);

      const data = [allPlayers[random], allPlayers[random2]];
      return data;
    },
    getOnePlayer: async (
      _: void,
      args: { player: string; position: string }
    ) => {
      return await Player.findOne({
        name: { $regex: diacriticSensitiveRegex(args.player), $options: "i" },
      });
    },
    getPlayersForPosition: async (
      _: void,
      args: { player: string; position: string }
    ) => {
      return await Player.find({
        name: { $regex: diacriticSensitiveRegex(args.player), $options: "i" },
        position: { $eq: args.position },
      });
    },
    getPlayersForLeague: async (
      _: void,
      args: { player: string; league: string }
    ) => {
      return await Player.find({
        name: { $regex: diacriticSensitiveRegex(args.player), $options: "i" },
        league: { $eq: args.league },
      });
    },
  },
};
