import { leaguesDict } from "../../utils/dict";
import { leaguesToScrap } from "../../utils/leaguesToScrap";
import { infoLeague } from "./scripts/infoLeague";
import { infoPlayer } from "./scripts/infoPlayer";
import { infoTeam } from "./scripts/infoTeam";

async function allLeagueScrap({ page }) {
  const toScrap = leaguesDict.filter((league) =>
    leaguesToScrap.includes(league)
  );
  if (toScrap.length === 0) return;

  for (let x = 0; x < leaguesToScrap.length; x++) {
    await task({ query: leaguesToScrap[x], page });
  }
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
