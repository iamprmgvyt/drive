/**
 * Minimal auth helpers: Argon2id password hashing and TOTP registration/verification.
 * Uses `argon2` and `otplib`. Intended for Milestone 1 unit tests and integration.
 */

import argon2 from 'argon2';
import { authenticator } from 'otplib';
import { randomBytes } from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  // argon2id defaults via library (tunable parameters should be config-driven)
  return await argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
}

export function generateTotpSecret(): string {
  // otplib uses base32 secret by default
  return authenticator.generateSecret(32); // length hint
}

export function generateTotpUri(secret: string, accountName: string, issuer = 'Drive'): string {
  return authenticator.keyuri(accountName, issuer, secret);
}

export function verifyTotp(token: string, secret: string, window = 1): boolean {
  // window: allow previous/current/next (±1)
  authenticator.options = { step: 30, digits: 6, algorithm: 'sha1' };
  // otplib supports window by passing { window }
  // Use constant-time comparison internally via library
  return authenticator.check(token, secret, { window });
}

export function generateRecoveryCodes(count = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const b = randomBytes(8).toString('hex').toUpperCase();
    // format XXXX-XXXX-XXXX-XXXX (16 hex => 16 chars)
    const formatted = b.slice(0,4) + '-' + b.slice(4,8) + '-' + b.slice(8,12) + '-' + b.slice(12,16);
    codes.push(formatted);
  }
  return codes;
}
