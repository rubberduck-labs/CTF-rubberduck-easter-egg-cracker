import type { VercelRequest, VercelResponse } from '@vercel/node';

const directory = 'color: #004FFF;';
const locked = 'color: #454851';
const file = 'color: white;';
const filesAndDirectories = [
  {
    egg: true,
    directory: false,
    locked: false,
    name: 'easter_egg.png'
  },
  {
    directory: false,
    locked: true,
    name: 'eggCrack.sh'
  },
  {
    directory: false,
    locked: true,
    name: 'file_5424.tmp'
  },
  {
    directory: false,
    locked: true,
    name: 'file_9273.tmp'
  },
  {
    directory: false,
    locked: true,
    name: 'file_2331.tmp'
  },
  {
    directory: false,
    locked: true,
    name: 'file_9207.tmp'
  }
];

const EASTER_EGG_FLAG = process.env.EASTER_EGG_FLAG;

export default async function(req: VercelRequest, res: VercelResponse) {
  try {    
    const entries = filesAndDirectories.map(dirent => dirent.egg
      ? `
        <a style="text-decoration: underline; ${directory}" target="_blank" href="/api/command_line/flag?key=${EASTER_EGG_FLAG}">
          ${dirent.name}
        </a>
      `
      : `
        <p style="${dirent.directory ? directory : file} ${dirent.locked ? locked : ''}">
          ${dirent.name}
        </p>
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