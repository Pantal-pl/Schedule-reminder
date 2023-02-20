import md5 from "js-md5";
import compareChanges from "./compareChanges.mjs";
import fetch from 'node-fetch';

type CalculetedHash = {
  oldLink: string
  newLink: string
  correctLink: string
  newMd5Hash: string
}

interface File {
  arrayBuffer: () => Promise<ArrayBuffer>
}

export default async function calculateHash(oldLink:string, newLink:string):Promise<CalculetedHash> {
   const newPdf:File = await fetch(newLink);

  const newPdfBuff:ArrayBuffer = await newPdf.arrayBuffer();

  const newMd5Hash:string = await md5(newPdfBuff);

  const correctLink:string = await compareChanges(oldLink, newLink);

  const obj:CalculetedHash = {
    oldLink: oldLink,
    newLink: newLink,
    correctLink: correctLink,
    newMd5Hash: newMd5Hash,
  };
  return obj;
}
