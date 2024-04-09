import { IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
