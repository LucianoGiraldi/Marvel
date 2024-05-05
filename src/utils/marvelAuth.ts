import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const getMarvelAuthParams = (): Record<string, string> => {
  const ts = Date.now().toString();
  const publicKey = process.env.MARVEL_PUBLIC_KEY || '';
  const privateKey = process.env.MARVEL_PRIVATE_KEY || '';
  
  const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

  return {
    ts,
    apikey: publicKey,
    hash,
  };
};
