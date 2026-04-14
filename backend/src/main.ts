import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // white list, its delete file not in DTO
    forbidNonWhitelisted: true, // back error when have excessivee
    transform: true,        // convert
  }));
  await app.listen(3000);
}
bootstrap();