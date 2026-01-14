import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(
  password: string,
  hash: string
): boolean {
  return bcrypt.compareSync(password, hash);
}
