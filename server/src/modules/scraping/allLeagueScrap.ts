//@ts-nocheck

import { sleep } from "../../utils/sleep";
import { infoLeague } from "./scripts/infoLeague";
import { infoPlayer } from "./scripts/infoPlayer";
import { infoTeam } from "./scripts/infoTeam";

async function allLeagueScrap({ page, date }) {
  const leaguesToScrap = await getLeaguesToScrap({ page, date });

  for (let x = 0; x < leaguesToScrap.length; x++) {
    await task({ query: leaguesToScrap[x], page });
  }
}

async function getLeaguesToScrap({ page, date }) {
  const navigateToPage = async (url, retries = 3, delay = 50000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        return true;
      } catch (error) {
        if (i < retries - 1) await sleep(delay);
      }
    }
    return false;
  };

  const isPageLoaded = await navigateToPage(
    `https://www.transfermarkt.com.ar/ticker/index/live?datum=${date}`
  );
  if (!isPageLoaded) {
    await sleep(5 * 60 * 1000);
    return getLeaguesToScrap({ page, date });
  }

  const leagues = await page.evaluate(() => {
    let data = [];

    const allLeaguesDict = {
      EL: "EL",
      CL: "CL",
      CLI: "CLI",
      CS: "CS",
      ES1: "ES1",
      NL1: "NL1",
      GB1: "GB1",
      FR1: "FR1",
      IT1: "IT1",
      L1: "L1",
      ARCA: "ARCA",
      AR1N: "AR1N",
      WMQ4: "WMQ4",
      UNLA: "UNLA",
      UNLB: "UNLB",
      UNLC: "UNLC",
      UNLD: "UNLD",
    };

    document
      .querySelectorAll("#spieltagsbox div[class='kategorie']")
      .forEach((item, i) => {
        const league_code = item.querySelector("h2 a").href.split("/").pop();
        const exist = allLeaguesDict[league_code];

        if (exist) {
          data.push(league_code);
        }
      });

    return data;
  });

  return leagues;
}

async function task({ query, page }) {
  await page.goto("https://www.transfermarkt.com.ar", {
    waitUntil: "networkidle0",
  });

  await page.type('input[name="query"]', query);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  const league = await infoLeague(page, query);
  const teams = await infoTeam(page, league, query);
  await infoPlayer(page, teams);
}

export default allLeagueScrap;
