// @ts-nocheck

import Player from "../../../models/Player";
import Team from "../../../models/Team";

export const infoPlayer = async (page, teams) => {
  for (let y = 0; y < teams.length; y++) {
    for (let x = 0; x < teams[y].url.length; x++) {
      const data = [];
      await page.goto(teams[y].url[x], {
        waitUntil: "networkidle0",
        timeout: 0,
      });

      const playerInfo = await page.evaluate(() => {
        const allStats = [];
        const info = [];

        const name = document
          .querySelector(".data-header__headline-container h1")
          .textContent.replace(/\s+/g, " ")
          .trim();

        const img =
          document.querySelector('div[class="modal-trigger"] img')?.src ||
          "https://img.a.transfermarkt.technology/portrait/header/default.jpg?lm=1";
        const marketValue = document.querySelector(
          ".data-header__box--small a"
        );
        document
          .querySelectorAll(".data-header__items li")
          .forEach((item, i) => {
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

            info.push({ [key]: data[1]?.trim() || null });
          });
        const infoObj = Object.assign({}, ...info);

        const stats = document.querySelectorAll(
          ".tm-player-performance__statistic-lists ul li"
        );
        const code = window.location.href.split("/").slice(-1).join();

        if (stats.length > 0) {
          for (let x = 0; x < stats.length; x++) {
            const field = stats[x].querySelector("div span")?.textContent;
            const value = stats[x].querySelector("a")?.textContent;

            allStats.push({ field, value });
          }
        }

        return {
          info: {
            name:
              name[0] === "#"
                ? name.split(" ").slice(1).join(" ")
                : name,
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
        const data = [];
        const items = document.getElementsByClassName("large-6 columns");
        if (!items) return;

        for (let x = 0; x < items.length; x++) {
          const title =
            items[x].querySelector("div h2")?.textContent.trim() || null;
          const img = items[x].querySelector("div div div img")?.src || null;
          const year = items[x].querySelector(
            "div div div:nth-child(2) table tbody tr td"
          ).textContent;
          const team =
            items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) a"
            )?.title ||
            items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) img"
            )?.title;

          const teamImg =
            items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) a img"
            )?.src ||
            items[x].querySelector(
              "div div div:nth-child(2) table tbody tr td:nth-child(2) img"
            )?.src;

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
        const itsAlreadyInDb = await Player.find({
          name: values.name,
        });
        if (itsAlreadyInDb.length === 0) {
          const newPlayer = new Player(values);
          await newPlayer.save();
          player = newPlayer;
        } else {
          player = await Player.updateOne({ name: values.name }, values);
        }

        const team = await Team.findOne({ "info.name": values.team });

        await Team.findOneAndUpdate(
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
