import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './../dtos/refresh-token.dto';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensService } from './generate-tokens.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensService {
  constructor(
    /**
     * Injecting jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting generateTokensService
     */
    private readonly generateTokensService: GenerateTokensService,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refreshToken using jwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      // Fetch user from database
      const user = await this.usersService.findOneById(sub);

      // Generate and return tokens
      return this.generateTokensService.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
