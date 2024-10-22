"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../../auth/providers/auth.service");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user.entity");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(authService, usersRepository, configService) {
        this.authService = authService;
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    async createUser(createUserDto) {
        let existingUser = null;
        try {
            existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email },
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later.', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        if (existingUser) {
            throw new common_1.BadRequestException('The user already exists. Please check your email');
        }
        let newUser = this.usersRepository.create(createUserDto);
        try {
            newUser = await this.usersRepository.save(newUser);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to create a new user at the moment. Please try again later.', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        return newUser;
    }
    async findAll(getUserParamDto, limit, page) {
        const environment = this.configService.get('DATABASE_NAME');
        console.log(environment);
        const users = this.usersRepository.find();
        return users;
    }
    async findOneById(id) {
        let user = null;
        try {
            user = await this.usersRepository.findOneBy({
                id,
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to create a new user at the moment. Please try again later.', {
                cause: error.message,
                description: 'Error connecting to the database',
            });
        }
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map