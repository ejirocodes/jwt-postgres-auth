import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ required: false })
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    minLength: 2,
    maxLength: 30,
    type: String,
    example: 'John',
  })
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @Type(() => String)
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
