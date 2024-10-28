import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(
    /**
     * Injecting mailerService
     */
    private readonly mailerService: MailerService,
  ) {}

  public async sendUserWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Onboarding Team <support@nestjs-blog.com>`, // setting the from email manually
      subject: 'Welcome to NestJS blog',
      template: 'welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
