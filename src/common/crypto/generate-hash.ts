import bcrypt from 'bcrypt';

export async function generateHash(password: string): Promise<void> {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(password, salt);
}
