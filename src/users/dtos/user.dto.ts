import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Display name of the user' })
  readonly displayName: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user' })
  readonly email: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'Email verified of the user' })
  readonly emailVerified: boolean;
  @IsNotEmpty()
  @ApiProperty({ description: 'Photo URL of the user' })
  readonly photoURL: string;
}
