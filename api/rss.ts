import { VercelResponse, VercelRequest } from "@vercel/node";
import { rss } from "./feed";

export default (_: VercelRequest, response: VercelResponse) => {
  response.status(200).setHeader("Content-Type", "text/xml");
  response.send(rss);
};
