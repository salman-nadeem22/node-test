import * as bcrypt from 'bcrypt';

export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}
