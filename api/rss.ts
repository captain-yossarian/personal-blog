import { VercelResponse, VercelRequest } from "@vercel/node";
import { rss } from "./feed";

export default (request: VercelRequest, response: VercelResponse) => {
  console.log({ request });
  response.status(200).setHeader("Content-Type", "text/xml");
  response.send(rss);
};
