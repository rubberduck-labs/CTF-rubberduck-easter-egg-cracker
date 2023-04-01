import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function(req: VercelRequest, res: VercelResponse) {
  const secret = req.query.secret;

  if (secret === process.env.EASTER_EGG_FLAG) {
    // const file = readFileSync(path.join(process.cwd(), 'api_resources', 'easter_egg.png'));
    // res.setHeader('conent-type', 'image/png');
    // res.end(file);

    const possibleFiles = fs.readdirSync(process.cwd());
    return res.json(possibleFiles);
  } else {
    return res.status(403).json({ error: 'Forbidden' });
  }
}