import * as bcrypt from 'bcrypt';

export async function compareHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
