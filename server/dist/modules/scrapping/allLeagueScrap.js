"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infoLeague_1 = require("./scripts/infoLeague");
const infoPlayer_1 = require("./scripts/infoPlayer");
const infoTeam_1 = require("./scripts/infoTeam");
async function allLeagueScrap({ query, page }) {
    let counter = 0;
    setInterval(() => {
        return counter++;
    }, 1000);
    await page.goto("https://www.transfermarkt.com.ar", {
        waitUntil: "networkidle0",
    });
    await page.type('input[name="query"]', query);
    await page.keyboard.press("Enter");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    const league = await (0, infoLeague_1.infoLeague)(page, query);
    const teams = await (0, infoTeam_1.infoTeam)(page, league, query);
    await (0, infoPlayer_1.infoPlayer)(page, teams);
    console.log(`Liga ${query} hecha en ${(counter / 60).toFixed(2)} mins`);
    return;
}
exports.default = allLeagueScrap;
