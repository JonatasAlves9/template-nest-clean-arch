import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async signIn(cpf: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
