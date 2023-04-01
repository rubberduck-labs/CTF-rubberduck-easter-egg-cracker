import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from "fs";
import path from "path";

export default async function(req: VercelRequest, res: VercelResponse) {
  const param = (req.query.param as string) || '';
  const fileData = fs.readFileSync(path.resolve(process.cwd(), param), 'utf-8');
  return res.send(`<div style="white-space: pre;">${fileData}</div>`);
}