"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./providers/auth.service");
const users_module_1 = require("../users/users.module");
const hashing_service_1 = require("./providers/hashing.service");
const bcrypt_service_1 = require("./providers/bcrypt.service");
const sign_in_service_1 = require("./providers/sign-in.service");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("./config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const generate_tokens_service_1 = require("./providers/generate-tokens.service");
const refresh_tokens_service_1 = require("./providers/refresh-tokens.service");
const google_authentication_controller_1 = require("./social/google-authentication.controller");
const google_authentication_service_1 = require("./social/providers/google-authentication.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController, google_authentication_controller_1.GoogleAuthenticationController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService,
            },
            sign_in_service_1.SignInService,
            generate_tokens_service_1.GenerateTokensService,
            refresh_tokens_service_1.RefreshTokensService,
            google_authentication_service_1.GoogleAuthenticationService,
        ],
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
        ],
        exports: [auth_service_1.AuthService, hashing_service_1.HashingService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map