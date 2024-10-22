import { AuthService } from '../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly authService;
    private readonly usersRepository;
    private readonly configService;
    constructor(authService: AuthService, usersRepository: Repository<User>, configService: ConfigService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number): Promise<User[]>;
    findOneById(id: number): Promise<any>;
}
