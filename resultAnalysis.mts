import mongoose, { ConnectOptions } from "mongoose";
import Links from "./models/link.mjs";
import * as dotenv from "dotenv";
import calculateHash from "./utils/calculateHash.mjs";
import updateDbAndInformUser from "./utils/updateDbAndInformUser.mjs";
import sendSMS from "./utils/informUser/sendSMS.mjs";
dotenv.config({path:"../../.env"});

type LinkObject =  {
  linkB1: string;
  linkA1: string;
  linkA2: string;
}

type CalculetedHash =  {
  oldLink: string;
  newLink: string;
  correctLink: string;
  newMd5Hash: string;
}
   
export default async function compareAndSaveResults(linkObject: LinkObject): Promise<void> {
  console.log("start resultAnalysis.js");
  try {
    console.log("start mongo");
    await mongoose.connect(process.env.MONGO_URI ?? "", {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
     } as ConnectOptions);
    console.log("\u001b[" + 32 + "m" + "Mongodb connected!" + "\u001b[0m");
    try {
      const linksStoreInDatabase = await Links.find().exec();

      const B1Link: string = linksStoreInDatabase[0].link;
      const A1Link: string = linksStoreInDatabase[1].link;
      const A2Link: string = linksStoreInDatabase[2].link;

      const B1Hash: string = linksStoreInDatabase[0].hash;
      const A1Hash: string = linksStoreInDatabase[1].hash;
      const A2Hash: string = linksStoreInDatabase[2].hash;

      const B1NewLink: string = linkObject.linkB1.slice(0, -32);
      const A1NewLink: string = linkObject.linkA1.slice(0, -32);
      const A2NewLink: string = linkObject.linkA2.slice(0, -32);

      const B1Obj: CalculetedHash = await calculateHash(B1NewLink, B1Link);
      const A1Obj: CalculetedHash = await calculateHash(A1NewLink, A1Link);
      const A2Obj: CalculetedHash = await calculateHash(A2NewLink, A2Link);

      if(linksStoreInDatabase[0].hash !== B1Obj.newMd5Hash || linksStoreInDatabase[1].hash !== A1Obj.newMd5Hash || linksStoreInDatabase[2].hash !== A2Obj.newMd5Hash) {
        await sendSMS("","","admin")
      }

      if (linksStoreInDatabase[0].hash !== B1Obj.newMd5Hash) {
        await updateDbAndInformUser(B1Obj.correctLink, B1Obj.newMd5Hash, "B1");
      }
      if (linksStoreInDatabase[1].hash !== A1Obj.newMd5Hash) {
        await updateDbAndInformUser(A1Obj.correctLink, A1Obj.newMd5Hash, "A1");
      }
      if (linksStoreInDatabase[2].hash !== A2Obj.newMd5Hash) {
        await updateDbAndInformUser(A2Obj.correctLink, A2Obj.newMd5Hash, "A2");
      }

    } catch (err) {
      console.log(err);
    }
    console.log("end mongo");
  } catch (error) {
    console.log(error);
  }
  console.log("stop resultAnalysis.js");
}
