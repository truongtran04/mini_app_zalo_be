import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateZaloUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsString()
  @IsNotEmpty()
  token: string; // phone token từ Zalo Mini App
}
