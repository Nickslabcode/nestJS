import { CreateUserDto } from './../dtos/create-user.dto';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UsersCreateManyService } from './users-create-many.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserService } from './create-user.service';
import { FindOneByEmailService } from './find-one-by-email.service';
import { FindOneByGoogleIdService } from './find-one-by-google-id.service';
import { CreateGoogleUserService } from './create-google-user.service';
import { GoogleUser } from '../interfaces/google-user.interface';
export declare class UsersService {
    private readonly usersRepository;
    private readonly usersCreateManyService;
    private readonly createUserService;
    private readonly findOneByEmailService;
    private readonly findOneByGoogleIdService;
    private readonly createGoogleUserService;
    constructor(usersRepository: Repository<User>, usersCreateManyService: UsersCreateManyService, createUserService: CreateUserService, findOneByEmailService: FindOneByEmailService, findOneByGoogleIdService: FindOneByGoogleIdService, createGoogleUserService: CreateGoogleUserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number): Promise<User[]>;
    findOneById(id: number): Promise<any>;
    createMany(createManyUsersDto: CreateManyUsersDto): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOneByGoogleId(googleId: string): Promise<User>;
    createGoogleUser(googleUser: GoogleUser): Promise<User>;
}
