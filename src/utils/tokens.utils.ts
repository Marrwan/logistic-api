import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { ValidationError } from '../middleware/error/error.middleware';

export const hashToken = async (token: string): Promise<string> => {

  const salt = await bcrypt.genSalt(10);
  const hashedToken = await bcrypt.hash(token, salt);

  return hashedToken;
};

export const compareToken = async (plainText: string, hashedToken: string): Promise<boolean> => {
  const match = await bcrypt.compare(plainText, hashedToken);
  return match;
};

export const generateRandomNumber = async (length: number): Promise<number> => {
  // Validate length parameter
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Length must be a positive integer');
  }

  // Calculate range for random number generation
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  // Generate random number within range using crypto
  const randomValue = await crypto.randomInt(min, max);
  return randomValue;
};

export function generateAccessToken(user: typeof User): string {
  // var process: NodeJS.Process
  console.log({ token: user });

  let secret = process.env.SECRET_KEY;

  return jwt.sign(user, `${secret}`, { expiresIn: '1h' });

}

export function decodeAccessToken(token: string): any | null {
  try {
    let secret = process.env.SECRET_KEY;

    return jwt.verify(token, `${secret}`);
  } catch (error: any) {
    console.error('Error decoding access token:', error.message);
    throw new ValidationError("Invalid token");
  }
}