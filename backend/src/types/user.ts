export type User = {
  email: string;
  password: string;
  name: string; // s malým s je to Primitivní typy
  lastLogin: Date; // Date s velkým D je v typescript objektový typ
  isVerified: boolean;
  resetPasswordToken: string | undefined;
  resetPasswordTokenExpiresAt: Date | undefined;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: Date | undefined;
}