"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('NestJS MasterClass - Blog app API')
        .setDescription('Use the base API URL as http://localhost:3000')
        .setVersion('1.0')
        .setTermsOfService('http://localhost:3000')
        .setLicense('MIT License', 'http://localhost:3000')
        .addServer('http://localhost:3000')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configService = app.get(config_1.ConfigService);
    aws_sdk_1.config.update({
        credentials: {
            accessKeyId: configService.get('appConfig.awsAccessKeyId'),
            secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
        },
        region: configService.get('appConfig.awsRegion'),
    });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map