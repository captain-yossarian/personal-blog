import { VercelResponse, VercelRequest } from "@vercel/node";

export const handler = (request: VercelRequest, response: VercelResponse) => {
  console.log({ request });

};
