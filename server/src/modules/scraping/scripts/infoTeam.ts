// @ts-nocheck

import Team from "../../../models/Team";
import League from "../../../models/League";
import { getYear } from "../../../utils/getYear";

export const infoTeam = async (page, league, query) => {
  const data = [];
  const logosData = [];

  const year = query === "AR1N" ? "2023" : getYear;

  for (let x = 0; x < league.table.length; x++) {
    await page.goto(league.table[x].url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const mainPageInfo = await page.evaluate(async () => {
      const url = window.location.href;

      const name = document
        .querySelector(
          'h1[class="data-header__headline-wrapper data-header__headline-wrapper--oswald"]'
        )
        .textContent.replace(/\n/g, "")
        .trim();
      const img = document
        .querySelector('div[class="data-header__profile-container"] img')
        .getAttribute("src");
      const league = document
        .querySelector(
          'div[class="data-header__club-info"] span:nth-child(1) a'
        )
        .textContent.replace(/\n/g, "")
        .trim();
      const stadium = document.querySelector(
        'ul[class="data-header__items"] li:nth-child(2) span a'
      ).textContent;
      const balance = document.querySelector(
        'ul[class="data-header__items"] li[class="data-header__label"] span span a'
      ).textContent;
      const marketValue = document
        .querySelector('div[class="data-header__box--small"] a')
        .textContent.split("\n")
        .slice(0, 1)
        .join()
        .trim();

      return {
        team: {
          name,
          img,
          league,
          stadium,
          balance,
          marketValue,
        },
        url,
      };
    });

    logosData.push({
      title: mainPageInfo.team.title,
      img: mainPageInfo.team.img,
    });

    const code = mainPageInfo.url.split("/").splice(6, 1).join();
    await page.goto(
      `https://www.transfermarkt.com.ar/a/erfolge/verein/${code}`,
      { waitUntil: "networkidle0", timeout: 0 }
    );
    const titles = await page.evaluate(() => {
      const data = [];

      const query =
        'div[class="large-8 columns"] div[class="row"] div[class="large-6 columns"]';

      const items = document.querySelectorAll(query);

      for (let x = 0; x < items.length; x++) {
        const title = items[x].querySelector("div div h2").textContent;
        const img = items[x].querySelector(
          'div div:nth-child(2) div[class="erfolg_bild_box"] img'
        ).src;
        const years = items[x]
          .querySelector(
            'div div:nth-child(2) div[class="erfolg_infotext_box"]'
          )
          .textContent.replace(/,\s*|\t|\n/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .join(", ");

        data.push({ title, img, years });
      }

      return data;
    });

    await page.goto(
      `https://www.transfermarkt.com.ar/a/spielplandatum/verein/${code}/plus/0?saison_id=${year}&wettbewerb_id=${query}&day=&heim_gast=&punkte=&datum_von=-&datum_bis=-`,
      { waitUntil: "networkidle0", timeout: 0 }
    );
    const calendar = await page.evaluate(async () => {
      const data = [];
      const allDates = [];
      const query =
        'div[class="large-8 columns"] div:nth-child(1) div:nth-child(5) table tbody';
      document
        .querySelectorAll(`${query} tr[style] td:nth-child(1) a`)
        .forEach((r) => allDates.push(r.textContent));

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
          : type === "data-src"
          ? document.querySelector(querySearch).getAttribute("data-src")
          : type === "href"
          ? document.querySelector(querySearch).href
          : document
              .querySelector(querySearch)
              .textContent.trim()
              .replace(/\n/g, "");
      };

      for (let x = 1; x <= allDates.length; x++) {
        let numberToString = (1 + x).toString();

        const date = await searchInTable({
          query,
          numIncrement: numberToString,
          tableChild: "2",
        });
        const time = await searchInTable({
          query,
          numIncrement: numberToString,
          tableChild: "3",
        });
        const locality = await searchInTable({
          query,
          numIncrement: numberToString,
          tableChild: "4",
        });
        const rivalImg = await searchInTable({
          query,
          endQuery: "a img",
          numIncrement: numberToString,
          tableChild: "6",
          type: "img",
        });
        const rival = await searchInTable({
          query,
          endQuery: "a",
          numIncrement: numberToString,
          tableChild: "7",
        });
        const result = await searchInTable({
          query,
          numIncrement: numberToString,
          tableChild: "10",
        });
        data.push({
          game: x,
          date,
          time,
          locality,
          rivalImg,
          rival,
          result,
        });
      }

      return data;
    });

    await page.goto(
      `https://www.transfermarkt.com.ar/a/kader/verein/${code}/saison_id/${year}`,
      { waitUntil: "networkidle0", timeout: 0 }
    );
    const squad = await page.evaluate(async () => {
      const numberSquad = [];
      const urlA = [];
      const query = 'div[class="grid-view"] table tbody';

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
          : type === "data-src"
          ? document.querySelector(querySearch).getAttribute("data-src")
          : type === "href"
          ? document.querySelector(querySearch).href
          : document
              .querySelector(querySearch)
              .textContent.trim()
              .replace(/\n/g, "");
      };

      document
        .querySelectorAll(`${query} tr td:nth-child(1) div`)
        .forEach((r) => {
          numberSquad.push(r.textContent);
        });

      for (let x = 1; x <= numberSquad.length; x++) {
        let numberToString = x.toString();

        const url = await searchInTable({
          query,
          endQuery: "table > tbody > tr:nth-child(1) > td:nth-child(2) a",
          numIncrement: numberToString,
          tableChild: "2",
          type: "href",
        });
        urlA.push(url);
      }

      return { url: urlA };
    });

    data.push({
      info: mainPageInfo.team,
      titles,
      calendar,
      url: squad.url,
    });
  }

  const pushToDb = async () => {
    await League.updateOne({ title: query }, { logos: logosData });

    for (let x = 0; x < data.length; x++) {
      const values = {
        info: data[x].info,
        titles: data[x].titles,
        squad: data[x].squad,
        schedule: data[x].calendar,
      };
      const itsAlreadyInDb = await Team.find({
        "info.name": data[x].info.name,
      });

      if (itsAlreadyInDb.length === 0) {
        const newTeam = new Team(values);
        await newTeam.save();
      } else {
        await Team.updateOne({ "info.name": data[x].info.name }, values);
      }
    }
  };
  await pushToDb();

  return data;
};
