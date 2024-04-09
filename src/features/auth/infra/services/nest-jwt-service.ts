// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceContract } from '@shared/abstractions/jwt-service';

@Injectable()
export class JwtServiceWrapper extends JwtServiceContract {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }
}
