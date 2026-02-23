import { OmitType } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

// Shape of user data returned to the client
// OmitType creates a real class with all UserEntity fields except password
// — NestJS can inspect it at runtime (unlike TypeScript types which disappear after compilation)
export class PublicUserDto extends OmitType(UserEntity, [
  'password',
  'email',
  'updatedAt',
] as const) {}
