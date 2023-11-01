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
(async () => {
  dotenv.config();
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://nextjs-sports-app.vercel.app"],
    })
  );

  app.get("/", (_, res) => res.send("API ON"));
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
    });

  const apolloServer = new ApolloServer({
    typeDefs: [LeagueDef, playerDef, TeamDef],
    resolvers: [LeagueResolver, PlayerResolver, TeamResolver],
    csrfPrevention: true,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
})();
