"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoPlayer = void 0;
const Player_1 = __importDefault(require("../../../models/Player"));
const Team_1 = __importDefault(require("../../../models/Team"));
const infoPlayer = async (page, teams) => {
  for (let y = 0; y < teams.length; y++) {
    for (let x = 0; x < teams[y].url.length; x++) {
      const data = [];
      await page.goto(teams[y].url[x], {
        waitUntil: "networkidle0",
        timeout: 0,
      });
      const playerInfo = await page.evaluate(() => {
        var _a, _b, _c;
        const allStats = [];
        const info = [];
        const name = document
          .querySelector(".data-header__headline-ContainerOne h1")
          .textContent.replace(/\s+/g, " ")
          .trim();
        const img =
          ((_a = document.querySelector('div[class="modal-trigger"] img')) ===
            null || _a === void 0
            ? void 0
            : _a.src) ||
          "https://img.a.transfermarkt.technology/portrait/header/default.jpg?lm=1";
        const marketValue = document.querySelector(
          ".data-header__box--small a"
        );
        document
          .querySelectorAll(".data-header__items li")
          .forEach((item, i) => {
            var _a;
            const dictionary = {
              0: "birth",
              1: "placeToBirth",
              2: "nacionality",
              3: "height",
              4: "position",
              5: "nationalTeam",
              6: "matches",
            };
            const data = item.textContent.replace(/\s+/g, " ").split(":");
            const key = dictionary[i];
            if (!key) return;
            info.push({
              [key]:
                ((_a = data[1]) === null || _a === void 0
                  ? void 0
                  : _a.trim()) || null,
            });
          });
        const infoObj = Object.assign({}, ...info);
        const stats = document.querySelectorAll(
          ".tm-player-performance__statistic-lists ul li"
        );
        const code = window.location.href.split("/").slice(-1).join();
        if (stats.length > 0) {
          for (let x = 0; x < stats.length; x++) {
            const field =
              (_b = stats[x].querySelector("div span")) === null ||
              _b === void 0
                ? void 0
                : _b.textContent;
            const value =
              (_c = stats[x].querySelector("a")) === null || _c === void 0
                ? void 0
                : _c.textContent;
            allStats.push({ field, value });
          }
        }
        return {
          info: {
            name: name[0] === "#" ? name.split(" ").slice(1).join(" ") : name,
            number:
              name[0] === "#"
                ? name.split(" ").slice(0, 1).join(" ").substring(1)
                : null,
            img,
            ...infoObj,
            marketValue: marketValue
              ? `${marketValue.textContent.split(" ")[0]} ${
                  marketValue.textContent.split(" ")[1]
                } ${marketValue.textContent.split(" ")[2]}`
              : null,
            stats: allStats,
          },
          code,
        };
      });
      data.push({
        ...playerInfo.info,
        team: teams[y].info.name,
        teamImg: teams[y].info.img,
        league: teams[y].info.league,
      });
      await page.goto(
        `https://www.transfermarkt.com.ar/a/erfolge/spieler/${playerInfo.code}`,
        { waitUntil: "networkidle0", timeout: 0 }
      );
      const titles = await page.evaluate(() => {
        var _a, _b, _c, _d, _e, _f;
        const data = [];
        const items = document.getElementsByClassName("large-6 columns");
        if (!items) return;
        for (let x = 0; x < items.length; x++) {
          const title =
            ((_a = items[x].querySelector("div h2")) === null || _a === void 0
              ? void 0
              : _a.textContent.trim()) || null;
          const img =
            ((_b = items[x].querySelector("div div div img")) === null ||
            _b === void 0
              ? void 0
              : _b.src) || null;
          const year = items[x].querySelector(
            "div div div:nth-child(2) table tbody tr td"
          ).textContent;
          const team =
            ((_c = items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) a"
            )) === null || _c === void 0
              ? void 0
              : _c.title) ||
            ((_d = items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) img"
            )) === null || _d === void 0
              ? void 0
              : _d.title);
          const teamImg =
            ((_e = items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) a img"
            )) === null || _e === void 0
              ? void 0
              : _e.src) ||
            ((_f = items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) img"
            )) === null || _f === void 0
              ? void 0
              : _f.src);
          data.push({ title, img, year: { year, teamImg, team } });
        }
        return data;
      });
      const values = {
        ...data[0],
        titles,
      };
      const pushToDb = async () => {
        let player;
        const itsAlreadyInDb = await Player_1.default.find({
          name: values.name,
        });
        if (itsAlreadyInDb.length === 0) {
          const newPlayer = new Player_1.default(values);
          await newPlayer.save();
          player = newPlayer;
        } else {
          player = await Player_1.default.updateOne(
            { name: values.name },
            values
          );
        }
        const team = await Team_1.default.findOne({ "info.name": values.team });
        await Team_1.default.findOneAndUpdate(
          { "info.name": player.team },
          {
            $push: {
              squad: player._id,
            },
          }
        );
      };
      await pushToDb();
    }
  }
};
exports.infoPlayer = infoPlayer;
