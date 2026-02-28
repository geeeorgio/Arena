import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsInt()
  @Min(15)
  @Max(50)
  @IsOptional()
  avgCycleDays!: number;

  @IsInt()
  @Min(1)
  @Max(15)
  @IsOptional()
  avgPeriodDays!: number;

  @IsBoolean()
  @IsOptional()
  reminderEnabled!: boolean;

  @IsInt()
  @Min(1)
  @Max(7)
  @IsOptional()
  reminderDaysBefore!: number;
}
