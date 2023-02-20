import cheerio from "cheerio";
import originalFetch from "node-fetch";
import * as dotenv from "dotenv";

// const fetch = require("fetch-retry")(originalFetch, {
//   retries: 5,
//   retryDelay: 800,
// });


dotenv.config();

 type LinksObject = {
  linkB1: string,
  linkA1: string,
  linkA2: string,
}
type ScheduleObject = {
  [key:string]: any
}
export default async function getSchedule(pageURL:string):Promise<LinksObject>{
  console.log("start app.js");
  try {
    console.log("start fetch");
    const response = await originalFetch(pageURL);
    console.log("stop fetch");

    const body = await response.text();
    const $ = cheerio.load(body);

    const B1ScheduleButton:ScheduleObject = $(process.env.HTML_BUTTON_SELECTOR_B1);
    const A1ScheduleButton:ScheduleObject = $(process.env.HTML_BUTTON_SELECTOR_A1);
    const A2ScheduleButton:ScheduleObject = $(process.env.HTML_BUTTON_SELECTOR_A2);

    const B1ScheduleLink:string = B1ScheduleButton.attr("data-downloadurl");
    const A1ScheduleLink:string = A1ScheduleButton.attr("data-downloadurl");
    const A2ScheduleLink:string = A2ScheduleButton.attr("data-downloadurl");

    const obj:LinksObject = {
      linkB1: B1ScheduleLink,
      linkA1: A1ScheduleLink,
      linkA2: A2ScheduleLink,
    };

    console.log("stop app.js");
    return obj;
  } catch (error) {
   throw(error)
  }
}
