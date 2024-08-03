import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateInstanceDto {
  // TODO: requires userId and token auth

  @IsString()
  @IsNotEmpty()
  name: string;

  logo: string;
  themeColor: string;
}

export class UpdateInstanceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
