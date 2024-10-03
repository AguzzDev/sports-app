"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLeague = void 0;
const League_1 = __importDefault(require("../../../models/League"));
const getYear_1 = require("../../../utils/getYear");
const infoLeague = async (page, query) => {
  const year = query === "AR1N" ? "2023" : getYear_1.getYear;
  await page.goto(
    `https://www.transfermarkt.com.ar/premier-league/startseite/wettbewerb/${query}`,
    {
      waitUntil: "networkidle0",
      timeout: 0,
    }
  );
  const info = await page.evaluate(async () => {
    var _a, _b, _c, _d;
    const searchInTable = ({
      query,
      endQuery,
      tableChild,
      numIncrement,
      type,
    }) => {
      var _a;
      const querySearch = endQuery
        ? `${query} > tr:nth-child(${numIncrement}) > td:nth-child(${tableChild}) > ${endQuery}`
        : `${query} > tr:nth-child(${numIncrement}) > td:nth-child(${tableChild})`;
      return type === "img"
        ? ((_a =
            document === null || document === void 0
              ? void 0
              : document.querySelector(querySearch)) === null || _a === void 0
            ? void 0
            : _a.src) || null
        : document
            .querySelector(querySearch)
            .textContent.trimStart()
            .trimEnd()
            .replace(/\n/g, "");
    };
    const data = [];
    const scrapingData = [];
    //Main Page
    document
      .querySelectorAll(
        'ul[class="data-header__items"] li[class="data-header__label"]'
      )
      .forEach((r) => {
        scrapingData.push(r.textContent.trim().replace(/\s+/g, " "));
      });
    // Top Scorers
    const topScorers = [];
    for (let x = 1; x <= 5; x++) {
      const query =
        'div[class="grid-view"] table:nth-child(2) > tbody:nth-child(2)';
      const position = searchInTable({
        query,
        numIncrement: x,
        tableChild: "1",
      });
      const img = searchInTable({
        query,
        numIncrement: x,
        tableChild: "2",
        endQuery: "table > tbody > tr > td > a > img",
        type: "img",
      });
      const player = searchInTable({
        query,
        endQuery: "table > tbody > tr > td:nth-child(2) a",
        numIncrement: x,
        tableChild: "2",
      });
      const positionIn = searchInTable({
        query,
        endQuery: "table > tbody > tr:nth-child(2) > td",
        numIncrement: x,
        tableChild: "2",
      });
      const team = searchInTable({
        query,
        endQuery: "a > img",
        numIncrement: x,
        tableChild: "4",
        type: "img",
      });
      const goals = searchInTable({
        query,
        numIncrement: x,
        tableChild: "5",
      });
      topScorers.push({
        position,
        img,
        player,
        positionIn,
        team,
        goals,
      });
    }
    data.push({
      name: document
        .querySelector(
          'h1[class="data-header__headline-wrapper data-header__headline-wrapper--oswald"]'
        )
        .textContent.trim(),
      img: document.querySelector(
        'div[class="data-header__profile-ContainerOne"] img'
      ).src,
      numPlayer:
        ((_a = scrapingData[1]) === null || _a === void 0
          ? void 0
          : _a.split(":")[1].trim()) || null,
      numPlayerForeign:
        ((_b = scrapingData[2]) === null || _b === void 0
          ? void 0
          : _b.split(":")[1].trim()) || null,
      marketValue:
        ((_c = scrapingData[3]) === null || _c === void 0
          ? void 0
          : _c.split(":")[1].trim()) || null,
      playerMoreExpensive:
        ((_d = scrapingData[5]) === null || _d === void 0
          ? void 0
          : _d.split(":")[1].trim()) || null,
      topScorers,
    });
    return data[0];
  });
  await page.goto(
    `https://www.transfermarkt.com.ar/a/gesamtspielplan/wettbewerb/${query}/saison_id/${year}`,
    { waitUntil: "networkidle0", timeout: 0 }
  );
  const calendar = await page.evaluate(() => {
    const data = [];
    const tables = document.getElementsByClassName("large-6 columns ");
    for (let x = 0; x < tables.length; x++) {
      const tableAllData = [];
      const trQuantity = [];
      const title = tables[x].children[0].children[0].textContent;
      const table =
        tables[x].children[0].children[1].querySelectorAll("table tbody tr");
      Object.assign(table).forEach((r) => {
        const value = r.children[0].getAttribute("colspan");
        return !value ? trQuantity.push(r) : null;
      });
      for (let x = 0; x < trQuantity.length; x++) {
        const searchInTable = ({ tdChild, endQuery, type }) => {
          const query = endQuery
            ? `td:nth-child(${tdChild}) ${endQuery}`
            : `td:nth-child(${tdChild}) `;
          return type === "img"
            ? trQuantity[x].querySelector(query).getAttribute("src")
            : trQuantity[x]
                .querySelector(query)
                .textContent.replace(/[\t,\n]/g, "")
                .replace(/\s+/g, " ")
                .trim("");
        };
        const date = searchInTable({ tdChild: "1" });
        const time = searchInTable({ tdChild: "2" });
        const localTeam = searchInTable({ tdChild: "3", endQuery: "a" });
        const localTeamImg = searchInTable({
          tdChild: "4",
          endQuery: "a img",
          type: "img",
        });
        const result = searchInTable({
          tdChild: "5",
        });
        const visitantTeamImg = searchInTable({
          tdChild: "6",
          endQuery: "a img",
          type: "img",
        });
        const visitantTeam = searchInTable({
          tdChild: "7",
          endQuery: "a",
        });
        tableAllData.push({
          date: `${date.substring(0, 1).toUpperCase()}${date.substring(1)}`,
          time,
          localTeam,
          localTeamImg,
          result,
          visitantTeamImg,
          visitantTeam,
        });
      }
      data.push({ title, tableAllData });
    }
    return data;
  });
  await page.goto(
    `https://www.transfermarkt.com.ar/a/tabelle/wettbewerb/${query}/saison_id/${year}`,
    { waitUntil: "networkidle0", timeout: 0 }
  );
  const table = await page.evaluate(async () => {
    const positions = [];
    const data = [];
    const searchInTable = ({
      query,
      endQuery,
      tableChild,
      numIncrement,
      type,
    }) => {
      const querySearch = endQuery
        ? `${query} > tr:nth-child(${numIncrement}) > td:nth-child(${tableChild}) > ${endQuery}`
        : `${query} > tr:nth-child(${numIncrement}) > td:nth-child(${tableChild})`;
      return type === "img"
        ? document.querySelector(querySearch).getAttribute("src")
        : type === "href"
        ? document.querySelector(querySearch).href
        : document
            .querySelector(querySearch)
            .textContent.trimStart()
            .trimEnd()
            .replace(/\n/g, "");
    };
    //Positions
    document
      .querySelectorAll(
        'div[class="responsive-table"] div table tbody tr td[class="rechts hauptlink"]'
      )
      .forEach((r) => {
        const string = r.textContent.replace(/\n/g, "").trim();
        positions.push(string);
      });
    for (let x = 1; x <= positions.length; x++) {
      let numberToString = x.toString();
      const query =
        'div[class="grid-view"] table:nth-child(2) > tbody:nth-child(2)';
      const img = searchInTable({
        query,
        endQuery: "a > img",
        numIncrement: numberToString,
        tableChild: "2",
        type: "img",
      });
      const team = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "3",
      });
      const games = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "4",
      });
      const win = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "5",
      });
      const draw = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "6",
      });
      const lose = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "7",
      });
      const differenceGoal = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "9",
      });
      const points = searchInTable({
        query,
        numIncrement: numberToString,
        tableChild: "10",
      });
      const url = searchInTable({
        query,
        endQuery: "a",
        numIncrement: numberToString,
        tableChild: "3",
        type: "href",
      });
      data.push({
        position: positions[x - 1],
        img,
        team,
        games,
        win,
        draw,
        lose,
        differenceGoal,
        points,
        url,
      });
    }
    return data;
  });
  const pushToDb = async () => {
    const data = {
      ...info,
      table,
      calendar,
    };
    const itsAlreadyInDb = await League_1.default.find({ name: info.name });
    if (itsAlreadyInDb.length === 0) {
      const newLeague = new League_1.default(data);
      await newLeague.save();
    }
    await League_1.default.updateOne({ name: info.name }, data);
  };
  await pushToDb();
  return { info, calendar, table };
};
exports.infoLeague = infoLeague;
