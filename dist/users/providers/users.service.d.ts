import { CreateUserDto } from './../dtos/create-user.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UsersCreateManyService } from './users-create-many.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserService } from './create-user.service';
export declare class UsersService {
    private readonly authService;
    private readonly usersRepository;
    private readonly usersCreateManyService;
    private readonly createUserService;
    constructor(authService: AuthService, usersRepository: Repository<User>, usersCreateManyService: UsersCreateManyService, createUserService: CreateUserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number): Promise<User[]>;
    findOneById(id: number): Promise<any>;
    createMany(createManyUsersDto: CreateManyUsersDto): Promise<User[]>;
}
