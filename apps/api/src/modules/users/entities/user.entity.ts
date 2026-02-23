import type { User } from '../../../generated/prisma/client';
// Mirrors the Prisma User model as a class
// implements User — TypeScript enforces that all Prisma fields are present

// If schema changes, TS will error here — keeping entity in sync with DB
export class UserEntity implements User {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  rating!: number;
  createdAt!: Date;
  updatedAt!: Date;
  isActive!: boolean;
}
