"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const allLeagueScrap_1 = __importDefault(require("./allLeagueScrap"));
const allLeagues_1 = require("../../utils/allLeagues");
dotenv_1.default.config();
const scrapper = async () => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        timeout: 0,
    });
    const page = await browser.newPage();
    for (let x = 0; x < allLeagues_1.allLeagues.length; x++) {
        await (0, allLeagueScrap_1.default)({ page, query: allLeagues_1.allLeagues[x] });
    }
    // const a = await matchesInGameScrap({ page });
    // console.log(a.data);
    await browser.close();
};
exports.default = scrapper;
