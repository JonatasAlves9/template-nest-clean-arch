import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';
import * as fs from 'fs';
import * as https from 'https';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(
    session({
      secret: '1234',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 30,
        sameSite: 'none',
        secure: true,
      },
    }),
  );

  if (process.env.MODE === 'production') {
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/www.adasi.dev/privkey.pem'),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/www.adasi.dev/fullchain.pem',
      ),
    };
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
    );
    https
      .createServer(options, app.getHttpAdapter().getInstance())
      .listen(3000);
  }
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
