// 


import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { verifyJwt, Session, isSolved } from './next_egg';

const SLACK_HOOK = process.env.SLACK_HOOK as string;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

export default async function(req: VercelRequest, res: VercelResponse) {
  const session = req.cookies['session'];
  const email = req.body.email?.trim();
  if (!!session && !!email) {
    const verifiedSession = await verifyJwt(session) as Session;
    if (isSolved(verifiedSession) && EMAIL_REGEX.test(email)) {
      await axios.post(SLACK_HOOK, {
        text: `🎉 En bruker har klart å løse CTF-oppgaven og har oppgitt epost: ${email}`
      });
      return res.status(200).json({ email });
    } else {
      return res.status(400).json({ error: 'session or email invalid', session, email });
    }
  } else {
    return res.status(400).json({ error: 'session or email missing', session, email });
  }
}