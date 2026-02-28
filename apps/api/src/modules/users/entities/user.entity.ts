import type { User, UserRole } from '../../../generated/prisma/client';
// Mirrors the Prisma User model as a class
// implements User — TypeScript enforces that all Prisma fields are present

// If schema changes, TS will error here — keeping entity in sync with DB
export class UserEntity implements User {
  id!: string;
  email!: string;
  username!: string;
  password!: string;

  birthDate!: Date | null;
  role!: UserRole;

  createdAt!: Date;
  updatedAt!: Date;
}
