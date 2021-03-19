import parseUrl from "./parseUrl.js";
import { OLXRUBRIC } from "./selectors.js";
import { create as createRubric } from "../dbAPI/rubrics/create.js";
import Database from "../dbAPI/database.js";
import dbConf from "../config/db.js";

const OLXURL = "https://www.olx.ua";

const DB = new Database(dbConf);

const extractOlxRubrics = async () => {
  const rubrics = await parseUrl(OLXURL, OLXRUBRIC, ($, index, rubric) => {
    const rubricData = {
      url: $(rubric).attr("href"),
      name: $(rubric).children().first().text(),
    };
    return rubricData;
  });
  rubrics.forEach(({ url, name }) => {
    createRubric(DB, url, name);
  });
  console.log("rubrics extracting");
};

try {
  extractOlxRubrics();
} catch (e) {
  console.log(e);
}
