import { SignInDto } from './../dtos/SignIn.dto';
import { UsersService } from '../../users/providers/users.service';
import { SignInService } from './sign-in.service';
export declare class AuthService {
    private readonly usersService;
    private readonly signInService;
    constructor(usersService: UsersService, signInService: SignInService);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    isAuth(): boolean;
}
