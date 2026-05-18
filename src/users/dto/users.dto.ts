import { IsString, IsPhoneNumber, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsString()
  @IsPhoneNumber('VN')
  phone: string;
}
