import { SignInDTO } from '@features/auth/application/params/signin.params';
import { LocalGuard } from '@features/auth/infra/services/local.auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { AuthService } from '../../../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDTO: SignInDTO) {
    // TODO - Validar DTO

    const params = signInDTO;

    const result = await this.authService.signIn(params.cpf, params.password);
    return {
      user: result,
    };
  }
}
