import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    /**
     * Injecting configService
     */
    private readonly configService: ConfigService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        apiVersion: this.configService.get('appConfig.apiVersion'),
        data,
      })),
    );
  }
}
