import cheerio from "cheerio";
import axios from "axios";

const parseUrl = async (url, selector, callback) => {
  const response = await axios(url);
  if (response.status !== 200) {
    console.log("Error occurred while fetching data");
  }
  const $ = cheerio.load(response.data);
  const data = $(selector);
  return data.map(callback.bind(null, $)).get();
};

export default parseUrl;
