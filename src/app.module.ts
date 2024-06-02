import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongoDBModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 60,
        limit: 10,
      },
    ],
  }),
  MongoDBModule,
  UsersModule,
  EmailModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
