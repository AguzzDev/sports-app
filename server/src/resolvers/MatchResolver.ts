import { pubsub } from "..";
import Match from "../models/Match";

export const MatchResolver = {
  Query: {
    getMatches: async () => {
      return await Match.find({});
    },
  },

  Subscription: {
    getMatches: {
      subscribe: () => pubsub.asyncIterator("GET_MATCHES"),
    },
  },
};
