import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import path from 'path';

export default async function(req: VercelRequest, res: VercelResponse) {
  const secret = req.query.secret;

  await new Promise((aa) => setTimeout(aa, 6000));

  if (secret === process.env.EASTER_EGG_FLAG) {
    const file = readFileSync(path.join(process.cwd(), 'api_resources', 'reward.jpeg'));
    res.setHeader('conent-type', 'image/jpeg');
    res.end(file);
  } else {
    return res.status(403).json({ error: 'Forbidden' });
  }
}