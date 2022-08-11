import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded, Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.use(json({ limit: '10mb' }));
  app.use(compression());
  app.use(
    urlencoded({
      limit: '5mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60,
      max: 5000,
      message:
        '⚠️ Too many request created from this IP, please try again after an hour',
    }),
  );

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') return res.redirect('/docs');
    next();
  });

  const globalPrefix = 'api';

  setupSwagger(app);
  const port = process.env.API_PORT || 3000;
  await app.listen(port, () =>
    Logger.log(
      'API Listening at http://localhost:' + port + '/' + globalPrefix,
    ),
  );
}

bootstrap();
