import { Module } from '@nestjs/common';
import { EmailController } from './email.controller.js';
import { EmailService } from './email.service.js';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
