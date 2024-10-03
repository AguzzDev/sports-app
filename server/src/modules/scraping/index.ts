import dotenv from "dotenv";
import { format, toZonedTime } from "date-fns-tz";
import puppeteer from "puppeteer";
import dailyMatchesScrap from "./dailyMatchesScrap";
import allLeagueScrap from "./allLeagueScrap";
import Match from "../../models/Match";
import cron from "node-cron";

dotenv.config();

const scrapper = async () => {
  cron.schedule(
    "1 0 * * *",
    async () => {
      try {
        const today = toZonedTime(new Date(), "America/Argentina/Buenos_Aires");
        const browser = await puppeteer.launch({
          headless: true,
          timeout: 0,
        });

        const page = await browser.newPage();
        const page2 = await browser.newPage();

        const date = format(today, "yyyy-MM-dd");

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 2);

        await Match.deleteMany({
          createdAt: { $lt: yesterday },
        });

        allLeagueScrap({ page: page2 });
        await dailyMatchesScrap({ page, date });

        await browser.close();
      } catch (error) {
        console.error("Error durante la tarea programada:", error);
      }
    },
    { timezone: "America/Argentina/Buenos_Aires" }
  );
};

export default scrapper;
