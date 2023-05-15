import { rss } from "./feed";

export default (_: any, response: any) => {
  response.status(200).setHeader("Content-Type", "text/xml");
  response.send(rss);
};
