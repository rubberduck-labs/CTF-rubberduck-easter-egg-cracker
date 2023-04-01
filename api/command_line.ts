import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import path from 'path';

const commands = {
  ls: async () => (await import('../api_resources/commands/ls')).default,
  help: async () => readFileSync(path.join(process.cwd(), 'api_resources', 'commands', 'help.html')),
};

export default async function(req: VercelRequest, res: VercelResponse) {
  const command = req.query.command as unknown as keyof typeof commands;
  const answer = await commands[command]();

  if (!answer) {
    return res.status(404).send('Command not found');
  } else {
    res.send(answer);
  }
}