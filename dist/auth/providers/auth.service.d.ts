import { SignInDto } from './../dtos/SignIn.dto';
import { UsersService } from '../../users/providers/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signIn(signInDto: SignInDto): void;
    isAuth(): boolean;
}
