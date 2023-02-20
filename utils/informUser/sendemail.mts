dotenv.config();
import mailTemplate from '../../helpers/mailTemplate.mjs';
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";


type stringOrUndefined = string | undefined
type stringArrayOrUndefined = string[] | undefined


type Msg = {
  to?: stringArrayOrUndefined,
  from?: stringOrUndefined,
  subject?: string,
  text?: string,
  html?: string,
}

export default async function sendMail(link:string, group:string):Promise<void> {
  console.log("start sendMail.js");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
  const emailsList = process.env.TO_EMAIL_LIST?.split(", ");
  // const htmlEl = await mailTemplate(link);

  const msg = {
    to: emailsList!,
    from: process.env.FROM_EMAIL ?? "",
    subject: "Dostępny jest nowy plan dla grupy " + group!,
    text: "Link: " + link!
  };

  try {
    const mail = await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
}
