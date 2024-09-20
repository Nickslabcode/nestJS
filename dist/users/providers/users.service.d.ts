import { GetUsersParamDto } from './../dtos/get-users-param.dto';
export declare class UsersService {
    findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number): {
        firstName: string;
        email: string;
    }[];
    findOneById(id: number): {
        id: number;
        firstName: string;
        email: string;
    };
}
