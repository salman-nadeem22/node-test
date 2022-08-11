import bcrypt from 'bcrypt';

async function matchPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
}
