import { VercelResponse, VercelRequest } from "@vercel/node";

const handler = (request: VercelRequest, response: VercelResponse) => {
  console.log({ request });
  response.status(200).setHeader("Content-Type", "text/xml");
  response.send('<p>ok</p>');

};

export default handler