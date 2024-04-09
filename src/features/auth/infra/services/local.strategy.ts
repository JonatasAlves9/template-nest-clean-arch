import { AuthService } from '@features/auth/application/services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'cpf',
    });
  }

  async validate(cpf: string, password: string): Promise<any> {
    const cleanCPF = this.cleanCPF(cpf);
    return await this.authService.signIn(cleanCPF, password);
  }

  private cleanCPF(cpf: string): string {
    // Remover caracteres não numéricos do CPF
    return cpf.replace(/\D/g, '');
  }
}
