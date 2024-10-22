import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(getUserParamDto: GetUsersParamDto, limit: number, page: number): Promise<import("./user.entity").User[]>;
    createUsers(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    patchUser(patchUserDto: PatchUserDto): PatchUserDto;
}
