import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport = require('passport');
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('REST APIs (nestjs example)')
    .setDescription('There is no description now..')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/swg-doc', app, document);
  app.use(session({secret: 'keyboard cat'}));
 
  await app.listen(2445);
}
bootstrap();
