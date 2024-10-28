"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.default = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'test', 'production', 'staging')
        .default('development'),
    DATABASE_PORT: Joi.number().port().default(5432),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    PROFILE_API_KEY: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
    JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
    API_VERSION: Joi.string().required(),
    AWS_PUBLIC_BUCKET_ID: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    AWS_CLOUDFRONT_URL: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_USERNAME: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
});
//# sourceMappingURL=environment.validation.js.map