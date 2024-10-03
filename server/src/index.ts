import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { LeagueResolver } from "./resolvers/LeagueResolver";
import { LeagueDef } from "./defs/LeagueDef";
import { PlayerResolver } from "./resolvers/PlayerResolver";
import { playerDef } from "./defs/PlayerDef";
import { TeamDef } from "./defs/TeamDefs";
import { TeamResolver } from "./resolvers/TeamsResolver";
import { MatchResolver } from "./resolvers/MatchResolver";
import { MatchDef } from "./defs/MatchDef";
import scrape from "./modules/scraping";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

(async () => {
  dotenv.config();
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.get("/", (_, res) => res.send("API ON"));

  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
    });

  const typeDefs = [LeagueDef, playerDef, TeamDef, MatchDef];
  const resolvers = [
    LeagueResolver,
    PlayerResolver,
    TeamResolver,
    MatchResolver,
  ];
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: process.env.CORS_ORIGIN },
  });

  const PORT = process.env.PORT;

  httpServer.listen(PORT, () => {
    console.log(`Server on ${PORT}`);

    scrape();
  });
})();
