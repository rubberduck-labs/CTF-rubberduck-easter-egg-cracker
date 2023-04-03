import type { VercelRequest } from '@vercel/node';
import jwt from 'njwt';

const SUPABASE_JWT_KEY = process.env.SUPABASE_JWT_KEY;

export default async function (request: VercelRequest) {
  const loginCookie = request.cookies['supa_login'];
  if (!!loginCookie) {

    console.log(SUPABASE_JWT_KEY)
    const userId = jwt.verify(loginCookie, SUPABASE_JWT_KEY)?.body?.toJSON()?.sub;
    console.log('User logged in! as ' + userId);
  }
};