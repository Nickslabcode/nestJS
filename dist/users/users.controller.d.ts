import { CreateUserDto } from './dtos/create-user.dto.js';
import { GetUsersParamDto } from './dtos/get-users-param.dto.js';
import { PatchUserDto } from './dtos/patch-user.dto.js';
import { UsersService } from './providers/users.service.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(getUserParamDto: GetUsersParamDto, limit: number, page: number): {
        firstName: string;
        email: string;
    }[];
    createUsers(createUserDto: CreateUserDto): string;
    patchUser(patchUserDto: PatchUserDto): PatchUserDto;
}
