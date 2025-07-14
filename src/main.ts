// src/main.ts

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  app.enableCors({

    origin: [

      'http://localhost:3000',

      'https://nutricion-api.desarrollo-software.xyz',

      'https://nutricion-alcocer.vercel.app',

    ],

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    credentials: true,

  });


  app.useGlobalPipes(new ValidationPipe({

    whitelist: true,

    forbidNonWhitelisted: true,

    transform: true,

  }));


  await app.listen(process.env.PORT ?? 3100);


  console.log(`API NestJS está escuchando en el puerto ${await app.getUrl()}`);

}

bootstrap(); 