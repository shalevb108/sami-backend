import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { EmailService } from './email.service.js';
import { CreateEmailDto } from './dto/create-email.dto.js';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body() body: CreateEmailDto) {
    return this.emailService.create(body);
  }
}
