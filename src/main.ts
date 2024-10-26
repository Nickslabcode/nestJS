import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // Implicitly converting types
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * Swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS MasterClass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000')
    .setLicense('MIT License', 'http://localhost:3000')
    .addServer('http://localhost:3000')
    .build();
  // Instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
