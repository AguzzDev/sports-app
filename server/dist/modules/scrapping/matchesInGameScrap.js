"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function matchesInGameScrap({ page }) {
    const data = [];
    let counter = 0;
    setInterval(() => {
        return counter++;
    }, 1000);
    await page.goto("https://www.transfermarkt.com.ar/ticker/index/live", {
        waitUntil: "networkidle0",
    });
    const live = await page.evaluate(() => {
        let data = [];
        const leaguesDictionary = {
            L1: "L1",
            ES1: "ES1",
            IT1: "IT1",
            FR1: "FR1",
            NL1: "NL1",
            GB1: "GB1",
        };
        document
            .querySelectorAll('table[class="livescore"] tbody tr')
            .forEach((r) => data.push({
            tableLink: r.children[3].children[0].href,
            leagueCode: r.children[6].children[0].dataset.competition,
        }));
        return data.filter(({ leagueCode }) => leaguesDictionary[leagueCode]);
    });
    for (let x = 2; x < 3; x++) {
        if (!live[x].tableLink)
            continue;
        await page.goto(live[x].tableLink, { waitUntil: "networkidle0" });
        //Its not playing now
        if (!live[x].tableLink.includes("ticker")) {
            const match = await page.evaluate(() => {
                //info
                const info = () => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const league = (_a = document
                        .querySelector(".spielername-profil.direct-headline__header--highlight-blue h2")) === null || _a === void 0 ? void 0 : _a.textContent.trim();
                    const image = (_b = document.querySelector("div[class='icons-profil direct-headline__header--highlight-blue'] div[class='wappen'] img")) === null || _b === void 0 ? void 0 : _b.src;
                    const date = (_c = document
                        .querySelector('p[class="sb-datum hide-for-small"]')) === null || _c === void 0 ? void 0 : _c.textContent.trim().replace(/\s/g, "").split("|");
                    const localTeam = (_d = document.querySelector("div[class='sb-team sb-heim'] a:nth-child(2)")) === null || _d === void 0 ? void 0 : _d.textContent;
                    const localTeamImage = (_e = document.querySelector("div[class='sb-team sb-heim'] a img")) === null || _e === void 0 ? void 0 : _e.src;
                    const stadium = (_f = document.querySelector(".sb-zusatzinfos span a")) === null || _f === void 0 ? void 0 : _f.textContent;
                    const visitTeam = (_g = document.querySelector("div[class='sb-team sb-gast'] a:nth-child(2)")) === null || _g === void 0 ? void 0 : _g.textContent;
                    const visitTeamImage = (_h = document.querySelector("div[class='sb-team sb-gast'] a img")) === null || _h === void 0 ? void 0 : _h.src;
                    return {
                        league,
                        image,
                        game: date[0],
                        date: date[1],
                        time: date[2],
                        localTeam,
                        localTeamImage,
                        stadium,
                        visitTeam,
                        visitTeamImage,
                    };
                };
                //lineup
                const lineup = () => {
                    const localTeamSelector = document.querySelector("#main > main > div:nth-child(11) > div > div > div");
                    const visitTeamSelector = document.querySelector("#main > main > div:nth-child(11) > div > div > div:nth-child(3)");
                    const tasks = (elementParent) => {
                        let xii = [];
                        let substitutes = [];
                        let dt;
                        const lineupType = elementParent
                            .querySelector("div.row > div")
                            .textContent.trim()
                            .split(":")[1]
                            .trim();
                        elementParent
                            .querySelectorAll("div:nth-child(3) div:nth-child(2) div.aufstellung-spieler-container")
                            .forEach((el) => {
                            const position = el.querySelector("div").textContent.trim();
                            const name = el.querySelector(`div:nth-child(2) span a`).textContent;
                            xii.push({
                                position,
                                name,
                            });
                        });
                        elementParent
                            .querySelectorAll("div:nth-child(4) table tbody tr")
                            .forEach((el) => {
                            if (el.style.length > 0) {
                                dt = el.querySelector("td:nth-child(2) a").textContent;
                                return;
                            }
                            const position = el.querySelector("td div").textContent.trim();
                            const name = el.querySelector("td:nth-child(2) a").textContent;
                            substitutes.push({
                                position,
                                name,
                            });
                        });
                        return {
                            lineupType,
                            xii,
                            substitutes,
                            dt,
                        };
                    };
                    return {
                        local: tasks(localTeamSelector),
                        visit: tasks(visitTeamSelector),
                    };
                };
                //goals
                const goals = () => {
                    let data = [];
                    document
                        .querySelectorAll("#main > main > div:nth-child(12) > div > div div ul li")
                        .forEach((el) => data.push({
                        team: el.querySelector("div div:nth-child(5) a").title,
                        name: el.querySelector("div div:nth-child(4) a").textContent,
                        // minute:  el.querySelector("div div:nth-child(2) b").textContent,
                    }));
                    return data;
                };
                //substitutions
                return {
                    info: info(),
                    lineup: {
                        local: lineup().local,
                        visit: lineup().visit,
                    },
                    goals: goals(),
                };
            });
            data.push(match);
            continue;
        }
        const match = await page.evaluate(() => {
            var _a;
            const date = (_a = document
                .querySelector('div[class="sbk-datum"]')) === null || _a === void 0 ? void 0 : _a.textContent.trim().replace(/\s/g, "").split("|");
            const league = document.querySelector('div[class="sbk-wettbewerb-infos"] a').textContent;
            const image = document.querySelector('div[class="large-3 columns sbk-wettbewerb"] img').src;
            const localTeam = document.querySelector('div[class="sbk-team sbk-heim"] a:nth-child(1)').textContent;
            const localTeamImage = document.querySelector('div[class="sbk-team sbk-heim"] a:nth-child(2) img').src;
            const visitTeam = document.querySelector('div[class="sbk-team sbk-gast"] a:nth-child(2)').textContent;
            const visitTeamImage = document.querySelector('div[class="sbk-team sbk-gast"] a:nth-child(1) img').src;
            const result = document
                .querySelector('div[id="ticker-ergebnis"]')
                .textContent.trim();
            const stadium = document.querySelector('p[class="sbk-zusatzinfos"] span a').textContent;
            const refereeName = document.querySelector('p[class="sbk-zusatzinfos"] a').textContent;
            return {
                league,
                image,
                game: document.querySelector('div[class="sbk-datum"] a:nth-child(1)')
                    .textContent,
                date: document
                    .querySelector('div[class="sbk-datum"] a:nth-child(3)')
                    .textContent.trim(""),
                time: date[1],
                localTeam,
                localTeamImage,
                stadium,
                visitTeam,
                visitTeamImage,
                result,
                refereeName,
            };
        });
        const element = await page.waitForSelector("#main > main > div:nth-child(10) > div > div > div > div.large-7.columns.small-12 > div > tm-ticker >>> app-tabs div:nth-child(3)", {
            visible: true,
            timeout: 0,
        });
        await element.click();
        await page.waitForTimeout(5000);
        data.push({
            info: match,
        });
    }
    return { data, counter: `Hecho en ${counter / 60} Mins` };
}
exports.default = matchesInGameScrap;
// const match = await page.evaluate(() => {
//   const documentShadow = document.querySelector(
//     "div:nth-child(10) div div div div div tm-ticker"
//   ).shadowRoot;
//   const date = document
//     .querySelector('div[class="sbk-datum"]')
//     ?.textContent.trim()
//     .replace(/\s/g, "")
//     .split("|");
//   const league = document.querySelector(
//     'div[class="sbk-wettbewerb-infos"] a'
//   ).textContent;
//   const image = document.querySelector(
//     'div[class="large-3 columns sbk-wettbewerb"] img'
//   ).src;
//   const localTeam = document.querySelector(
//     'div[class="sbk-team sbk-heim"] a:nth-child(1)'
//   ).textContent;
//   const localTeamImage = document.querySelector(
//     'div[class="sbk-team sbk-heim"] a:nth-child(2) img'
//   ).src;
//   const visitTeam = document.querySelector(
//     'div[class="sbk-team sbk-gast"] a:nth-child(2)'
//   ).textContent;
//   const visitTeamImage = document.querySelector(
//     'div[class="sbk-team sbk-gast"] a:nth-child(1) img'
//   ).src;
//   const result = document
//     .querySelector('div[id="ticker-ergebnis"]')
//     .textContent.trim();
//   // const minute = documentShadow.children[3].children[1].textContent.trim();
//   const stadium = document.querySelector(
//     'p[class="sbk-zusatzinfos"] span a'
//   ).textContent;
//   const refereeName = document.querySelector(
//     'p[class="sbk-zusatzinfos"] a'
//   ).textContent;
//   // stats
//   // const lineupTab = documentShadow.querySelector(
//   //   "app-tabs div div:nth-child(3)"
//   // );
//   // console.log(lineupTab);
//   const lineupTab = documentShadow.children[2].children[0].children[2];
//   // const a = documentShadow.querySelector(
//   //   "div:nth-child(5) > app-formation:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
//   // ).textContent;
//   // const tab1 = await (
//   //   await page.evaluateHandle("div[class='tabs'] div:nth-child(3)")
//   // ).asElement();
//   // tab1.click();
//   // const a = documentShadow.querySelector(
//   //   'div[class="ticker-wrapper ticker-content scroll-content"] app-formation div:nth-child(2) div div div:nth-child(2)'
//   // ).textContent;
//   return {
//     info: {
//       league,
//       image,
//       game: document.querySelector('div[class="sbk-datum"] a:nth-child(1)')
//         .textContent,
//       date: document
//         .querySelector('div[class="sbk-datum"] a:nth-child(3)')
//         .textContent.trim(""),
//       time: date[1],
//       localTeam,
//       localTeamImage,
//       stadium,
//       visitTeam,
//       visitTeamImage,
//       result,
//       // minute,
//       refereeName,
//     },
//     lineupTab: documentShadow.querySelector(
//       "app-tabs div div:nth-child(3)"
//     ),
//   };
// });
