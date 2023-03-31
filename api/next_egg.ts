import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'njwt';
import { createHash } from 'crypto';
import { getRandomNonce } from './nonces';

const REQUIRED_SOLVES = process.env.REQUIRED_SOLVES || 100_000_000;
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test';

// Information we save in our session
export type Session = {
  iat: number; // Issued at
  exp: number; // Expires at
  nonce_1: string; // First adjective
  nonce_2: string; // Second adjective
  challenge: string; // Our "lucky"-code. What we expect the user to solve
  solves: number; // Amout of solves our user has done in a row
  reward: string; // The reward once our user reaches "REQUIRED_SOLVES"
}

const verifyJwt = (token, secret) => new Promise((resolve, reject) => {
  try {
    const { alg } = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString('utf-8'));
    const response = jwt.verify(token, secret, alg);
    resolve(response.body);
  } catch (error) {
    reject(error);
  }
});
const signJwt = (data, secret) => new Promise((resolve) => {
  const response = jwt.create(data, secret);
  resolve(response);
});

// Function to generate a random challange. Generates a random string consiting of hex characters
function getRandomHexString(size: number): string {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const session = req.cookies['session'];

  if (!!session) {
    // If we have a session, parse the session as a JWT
    const verifiedSession = await verifyJwt(session, PRIVATE_KEY) as Session;

    // If the verified session has more than REQUIRED_SOLVES consecutive solves we respond with the flag
    if (verifiedSession.solves >= REQUIRED_SOLVES) {
      const reward = await import('./reward');
      return res.json({ reward: reward.default });
    }

    // Our session is verified
    // Get the challenge we want our user to solve & what the user suppiled as an answer to the challenge
    const challengeToSolve = verifiedSession['challenge'] as string;
    const adjustmentProvidedByUser = req.query['padding'] as string;

    if (!adjustmentProvidedByUser) {
      // No adjustment provided, keep current session
      return res.json(verifiedSession);
    }

    // Check if the answer is a valid solution
    const fullAnswer = verifiedSession.nonce_1 + verifiedSession.nonce_2 + adjustmentProvidedByUser;
    const fullAnswerAsHash = createHash('sha256').update(fullAnswer).digest('hex');
    const isValidAnswer = fullAnswerAsHash.startsWith(challengeToSolve);

    if (isValidAnswer) {
      // The user has provided a valid answer, we update their session with a new challenge and an increase to number of solves
      const currentAmountOfSolves = verifiedSession['solves'];
      const newChallenge = getRandomHexString(4);
      const newNounces = [getRandomNonce(), getRandomNonce()];
      const newSession = {
        nonce_1: newNounces[0],
        nonce_2: newNounces[1],
        challenge: newChallenge,
        solves: currentAmountOfSolves + 1
      };

      // Sign the new session
      const signedNewSession = await signJwt(newSession, PRIVATE_KEY);
      res.setHeader('Set-Cookie', `session=${signedNewSession}; Path=/`);
      return res.json(newSession);
    } else {
      // The answer was not valid, respond with 400 and do not update the session
      return res.status(400).json({ error: 'bad challenge answer', ...verifiedSession });
    }
  } else {
    // We don't have a session, start by creating a new session for the user
    const newChallenge = getRandomHexString(4);
    const newNounces = [getRandomNonce(), getRandomNonce()];
    const newSession = {
      nonce_1: newNounces[0],
      nonce_2: newNounces[1],
      challenge: newChallenge,
      solves: 0
    };

    // Sign the new session, with an expiry date of 10 minutes
    const signedNewSession = await signJwt(newSession, PRIVATE_KEY);
    res.setHeader('Set-Cookie', `session=${signedNewSession}; Path=/`);
    return res.json(newSession);
  }
}