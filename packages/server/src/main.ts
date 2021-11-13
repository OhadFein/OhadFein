import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { Environment } from './env.validation';

global.fetch = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // if (process.env.NODE_ENV === Environment.Development) {
  //   const config = new DocumentBuilder()
  //     .setTitle('DanSKill')
  //     .setDescription('DanSkill API description')
  //     .setVersion('1.0')
  //     .build();

  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api/docs', app, document);
  // }
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

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
  .then(() =>
    Logger.log(
      `App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode `
    )
  )
  .catch((error) => Logger.error(`Server failed`, error));
