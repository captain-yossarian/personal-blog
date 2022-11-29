import { VercelResponse, VercelRequest } from "@vercel/node";

const handler = (request: VercelRequest, response: VercelResponse) => {
  console.log({ request });

};

export default handler