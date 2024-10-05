import dotenv from "dotenv";
import { format, toZonedTime } from "date-fns-tz";
import puppeteer from "puppeteer";
import dailyMatchesScrap from "./dailyMatchesScrap";
import allLeagueScrap from "./allLeagueScrap";
import Match from "../../models/Match";
import cron from "node-cron";
import path from "path";

dotenv.config();

const scrapper = async () => {
  cron.schedule(
    "10 9 * * *",
    async () => {
      try {
        const today = toZonedTime(new Date(), "America/Argentina/Buenos_Aires");
        const browser = await puppeteer.launch({
          headless: true,
          timeout: 0,
          executablePath:
            "/workspace/server/chrome/linux-129.0.6668.58/chrome-linux64/chrome",
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-zygote",
            "--single-process",
          ],
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
