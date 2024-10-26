import { GoogleTokenDto } from './../dtos/google-token.dto';
import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokensService } from 'src/auth/providers/generate-tokens.service';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oAuthClient: OAuth2Client;

  constructor(
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

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    // Verify Google token sent by user
    const loginTicket = await this.oAuthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });

    // Extract the payload from Google JWT
    const {
      email,
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
    } = loginTicket.getPayload();

    // Find the user in our database using the GoogleId
    const user = await this.usersService.findOneByGoogleId(googleId);

    // If GoogleId exists, generate token
    if (user) {
      return this.generateTokensService.generateTokens(user);
    }

    // If not, create new user and then generate token
  }
}
