import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscribeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user' })
  readonly email: string;
}
