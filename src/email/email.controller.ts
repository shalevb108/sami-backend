import {
  Body,
  Controller,
  Get,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express'; // Import Response from Express


import { EmailService } from './email.service.js';
import { CreateEmailDto } from './dto/create-email.dto.js';
import { SavedEmailDto } from './dto/saved-email.dto.js';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

 // Endpoint for sending the email
 @Post()
 async create(@Body() body: CreateEmailDto) {
   return await this.emailService.create(body);
 }

 // Endpoint for downloading the Word file
 @Post('download')
 async downloadWordFile(@Body() body: CreateEmailDto, @Res() res: Response) {
   try {
     await this.emailService.createWordFile(body, res); // Generate and send the Word file
   } catch (error) {
     res.status(500).send('Error generating Word file');
   }
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
