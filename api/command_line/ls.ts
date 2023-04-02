import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from "fs";
import path from "path";

const directory = 'color: #004FFF;';
const file = 'color: white;';

export default async function(req: VercelRequest, res: VercelResponse) {
  try {
    const param = (req.query.param as string) || '';
    const filesAndDirectories = fs.readdirSync(path.join(process.cwd(), param), { withFileTypes: true });
    const entries = filesAndDirectories.map(dirent => `
      <p style="${dirent.isDirectory() ? directory : file}">${dirent.name}</p>
    `);

    return res.send(`
      <div style="display: grid; grid-template-columns: auto auto auto;">
        ${entries.join('\n')}
      </div>
    `);
  } catch(ex) {
    return res.status(400).json({ error: 'You probably don\'t have access to this file' });
  }
}