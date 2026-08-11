/**
 * Basic tests for TOTP behavior: current, previous, next step acceptance and rejection outside ±1.
 */

import { generateTotpSecret, verifyTotp } from '../src/lib/auth';
import { authenticator } from 'otplib';

describe('TOTP ±1 step verification', () => {
  test('current step valid', () => {
    const secret = generateTotpSecret();
    authenticator.options = { step: 30, digits: 6, algorithm: 'sha1' };
    const token = authenticator.generate(secret);
    expect(verifyTotp(token, secret, 1)).toBe(true);
  });

  test('previous and next accepted with window=1', () => {
    const secret = generateTotpSecret();
    authenticator.options = { step: 30, digits: 6, algorithm: 'sha1' };
    const tokenPrev = authenticator.generate(secret, { timestamp: Date.now() - 30000 });
    const tokenNext = authenticator.generate(secret, { timestamp: Date.now() + 30000 });
    expect(verifyTotp(tokenPrev, secret, 1)).toBe(true);
    expect(verifyTotp(tokenNext, secret, 1)).toBe(true);
  });

  test('token outside window rejected', () => {
    const secret = generateTotpSecret();
    authenticator.options = { step: 30, digits: 6, algorithm: 'sha1' };
    const tokenFar = authenticator.generate(secret, { timestamp: Date.now() + 5 * 30000 });
    expect(verifyTotp(tokenFar, secret, 1)).toBe(false);
  });
});
