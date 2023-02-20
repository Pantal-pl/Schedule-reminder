import Links from "../models/link.mjs";

export default async function updateDb(
  URLlink: string,
  md5Hash: string
): Promise<void | object> {
  const update = Links.findOneAndUpdate(
    { link: URLlink },
    {
      $set: {
        link: URLlink,
        hash: md5Hash,
      },
    },
    { new: true, multi: true }
  );

  const execute = update.exec((err: Error | null, data: unknown) => {
    if (err) console.log(err);
    console.log(data);
  });

  return execute;
}
