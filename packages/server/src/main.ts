import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as helmet from 'helmet';
import * as compression from 'compression';

global['fetch'] = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(compression());
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT);
}

bootstrap()
  .then(() => Logger.log(`App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode `))
  .catch((error) => Logger.error(`Server failed`, error));
