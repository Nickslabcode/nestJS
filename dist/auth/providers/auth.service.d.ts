import { SignInDto } from './../dtos/SignIn.dto';
import { UsersService } from '../../users/providers/users.service';
import { SignInService } from './sign-in.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensService } from './refresh-tokens.service';
export declare class AuthService {
    private readonly usersService;
    private readonly signInService;
    private readonly refreshTokensService;
    constructor(usersService: UsersService, signInService: SignInService, refreshTokensService: RefreshTokensService);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
