import * as dotenv from "dotenv";
dotenv.config({path:"../.env"});
import getSchedule from "./getSchedule.mjs";
import compareAndSaveResults from "./resultAnalysis.mjs";

type LinkObject = {
  linkB1: string;
  linkA1: string;
  linkA2: string;
};
export const handler = async():Promise<void> => {
  const result: LinkObject = await getSchedule(process.env.SCRAPED_LINK ?? "");
  try {
    await compareAndSaveResults(result);
  } catch (error) {
    throw error;
  }
}
