import { Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { InjectMongoDB } from '../database/injectDatabase.decorator';
import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from 'src/models/email.model';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private emailModel: Collection<Email>;
  constructor(@InjectMongoDB() private readonly db: Db) {
    this.emailModel = this.db.collection('emails');
  }

 
  async create(email: CreateEmailDto) {
    console.log('====================================');
    console.log(email);
    console.log('====================================');

     // Set up Nodemailer transporter
     let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'benhayunshalev@gmail.com', // your email address
        pass: 'q1we12345678', // your email password
      },
    });
    
    // Define email options
    let mailOptions = {
      from: 'benhayunshalev@gmail.com', // sender address
      to: 'benhayunshalev@gmail.com', // list of receivers
      subject: 'New Email Created', // Subject line
      text: `You have received a new email with the following details:
            Subject: "hgj"
            Body: ${email}`, // plain text body
      // html: `<b>${email.body}</b>`, // html body (optional)
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   }
}
