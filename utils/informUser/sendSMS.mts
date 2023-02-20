import * as dotenv from "dotenv";
import twilio from "twilio"
dotenv.config();

type MessageInformation  = {
  body: string;
  messagingServiceSid: string;
  to: string | number;
}

export default async function sendSMS(
  link: string,
  group: string,
  receiver: string
):Promise<MessageInformation> {
  const accountSid: string = process.env.ACCOUNT_SID!;
  const authToken: string = process.env.AUTH_SMS_TOKEN!;

  const client =  twilio(accountSid, authToken)
  const messegeType: string = receiver === "admin" ? "Dostępny jest nowy plan dla jakiejś grupy" : `Dostępny jest nowy plan dla grupy ${group}: ${link}`

  const message: MessageInformation = await client.messages.create({
    body: messegeType,
    messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
    to: String(process.env.PHONE_NUMBER),
  });

  console.log("message sent for " + group);

  return message;
}

