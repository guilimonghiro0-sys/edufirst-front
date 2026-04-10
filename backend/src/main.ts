import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import fastifyCors from '@fastify/cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 5000;

  await app.listen(port, '0.0.0.0');
  console.log(`Backend ready on http://localhost:${port}`);
}

bootstrap();
