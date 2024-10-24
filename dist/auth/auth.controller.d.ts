import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/SignIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        success: true;
        accessToken: Promise<string>;
        message: string;
    }>;
}
