import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from "fs";
import path from "path";

const EASTER_EGG_FLAG = process.env.EASTER_EGG_FLAG;

export default async function(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.query.key === EASTER_EGG_FLAG) {
      console.log('Someone found easter_egg.png');
      const file = fs.readFileSync(path.resolve(process.cwd(), 'api_resources/command_line/easter_egg.png'));
      res.setHeader('content-type', 'image/png');
      return res.end(file);
    } else {
      res.status(403).json({ error: 'invalid flag key' });
    }
  } catch(ex) {
    console.error(ex);
    return res.status(400).json({ error: 'You probably don\'t have access to this file' });
  }
}