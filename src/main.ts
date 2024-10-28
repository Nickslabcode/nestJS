import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS MasterClass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000')
    .setLicense('MIT License', 'http://localhost:3000')
    .addServer('http://localhost:3000')
    .build();
  // Instantiate document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Set up AWS SDK for uploading files to AWS S3 bucket
  const configService = app.get(ConfigService); // makes the env variables available to main.ts
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  // Enable cors
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
