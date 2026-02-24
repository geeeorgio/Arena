import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20, {
    message: 'Username must be at least 2 characters long, ( up to 20)',
  })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Please confirm your password' })
  confirmPassword!: string;
}
