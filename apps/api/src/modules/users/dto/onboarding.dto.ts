import { IsBoolean, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

import { Gender } from '../../../generated/prisma/enums';

export class OnboardingDto {
  // ISO date string e.g. '2000-01-01' — converted to Date in service
  @IsDateString()
  @IsNotEmpty()
  birthDate!: string;

  // Must be one of: FEMALE | MALE | OTHER
  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  // true = wants to monitor someone else's cycle (partner/parent)
  @IsBoolean()
  @IsNotEmpty()
  isParent!: boolean;
}
