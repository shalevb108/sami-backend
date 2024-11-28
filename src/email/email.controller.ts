import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { EmailService } from './email.service.js';
import { CreateEmailDto } from './dto/create-email.dto.js';
import { SavedEmailDto } from './dto/saved-email.dto.js';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body() body: CreateEmailDto) {
    return this.emailService.create(body);
  }

  @Get()
  getAll() {
    return this.emailService.getAllEmails();
  }

  @Post('/send-again')
  sendAgain(@Body() body: SavedEmailDto) {
    return this.emailService.sendAgain(body);
  }
}
