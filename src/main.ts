import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const HTTPPORT = configService.get<number>('HTTPPORT') || 4000;
  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('api', app, document);

  setTimeout(() => {
    console.log(`http://localhost:${HTTPPORT} started`);
  }, 2000);
  await app.listen(HTTPPORT);
}
bootstrap();
