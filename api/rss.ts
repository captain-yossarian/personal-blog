export default function handler(request:Request, response:Response) {
    const { name } = req.query;
    res.status(200).send(`Hello ${name}!`);
}