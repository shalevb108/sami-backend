import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://rosh-sami-azarzar.netlify.app'
    ],
  });

  await app.listen(3000);
}
bootstrap();
