import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rss } from './feed'

export default (request: VercelRequest, response: VercelResponse) => {
    const { name } = request.query;
    response.status(200).setHeader('Content-Type', 'text/xml')
    response.send(rss)
};