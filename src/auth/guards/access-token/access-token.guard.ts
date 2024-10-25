import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Injecting jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtConfig
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the JWT token from the header
    const token = this.extractRequestFromHeader(request);
    // Validate the token
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
