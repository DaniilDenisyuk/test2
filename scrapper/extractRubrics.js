import parseUrl from "./parseUrl.js";
import { OLXRUBRIC } from "./selectors.js";

const OLXURL = "https://www.olx.ua";

const extractOlxRubrics = async () => {
  const rubrics = parseUrl(OLXURL, OLXRUBRIC, ($, index, rubric) => {
    const rubricData = {
      url: $(rubric).attr("href"),
      name: $(rubric).children().first().text(),
    };
    return rubricData;
  });
  return rubrics;
};
