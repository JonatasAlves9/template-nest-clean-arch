import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtServiceContract } from '@shared/abstractions/jwt-service';
import { Argon2CryptService } from '@shared/services/argon2-crypt';
import { AuthService } from './application/services/auth.service';
import { LocalStrategy } from './infra/services/local.strategy';
import { JwtServiceWrapper } from './infra/services/nest-jwt-service';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { AuthenticatedGuard } from './infra/services/authentication.guard';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MenuService } from './application/services/menu/menu.service';
import { ListMenusUseCase } from './application/usecases/list-menus.usecase';
import { Menu } from './domain/entities/menu.entity';
import { MenuRepositoryInterface } from './domain/repositories/menu.repository';
import { ListMenusUseCaseInterface } from './domain/usecases/list-menus.usecase';
import { MenuTypeOrmRepository } from './infra/db/typeorm/repositories/menu.pg.repository';
import { MenuSchema } from './infra/db/typeorm/schemas/menu.schema';
import { Session } from './infra/services/session.serializer';
import { MenuController } from './presentation/controllers/menu/menu.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([MenuSchema]),
  ],
  providers: [
    AuthService,
    {
      provide: JwtServiceContract,
      useClass: JwtServiceWrapper,
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthenticatedGuard,
    },
    LocalStrategy,
    Session,
    Argon2CryptService,
    {
      provide: ListMenusUseCaseInterface,
      useFactory: (menuRepo: MenuRepositoryInterface) =>
        new ListMenusUseCase(menuRepo),
      inject: [MenuRepositoryInterface],
    },
    {
      provide: MenuRepositoryInterface,
      useFactory: (dataSource: DataSource) =>
        new MenuTypeOrmRepository(dataSource.getRepository(Menu)),
      inject: [getDataSourceToken()],
    },
    MenuService,
  ],
  controllers: [AuthController, MenuController],
})
export class AuthModule {}
