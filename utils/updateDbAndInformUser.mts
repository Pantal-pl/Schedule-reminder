import sendSMS from './informUser/sendSMS.mjs';
import sendMail from './informUser/sendemail.mjs';
import updateDb from "./updateDb.mjs";

export default async function updateDbAndInformUser(link:string, hash:string, group:string):Promise<void> {
  await updateDb(link, hash);
  await sendMail(link, group);
  // await sendSMS(link, group);
}
