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
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'benhayunshalev@gmail.com', // your email address
        pass: 'kxytrguuawtfzotr', // your email password
      },
    });

    // Extract fields from the email object
    const {
      attendanceNotes,
      cash,
      cashCancellation,
      clubMember,
      employeeAttendance,
      employeeNotes,
      envelopes,
      safe,
      smallRegister,
      envelopesInDay,
      folder,
      keys,
      otherDocuments,
      redemption,
      register,
      registerNotes,
      safeNotes,
      stockNotes,
      unloadedDocuments,
      unusualAmounts,
      warehouseStock,
    } = email;

    // Define email options
    const mailOptions = {
      from: 'benhayunshalev@gmail.com', // sender address
      to: 'benhayunshalev@gmail.com', // list of receivers
      subject: 'ד"וח חדש נשלח', // Subject line
      html: `<b>:כספת</b><br>
      <b>כספת תקנית:</b> ${safe ? 'כן' : 'לא'}<br>
      <b>מפתחות כספת בידי מנהל/זכיין:</b> ${keys ? 'כן' : 'לא'}<br>
      <b>רישום תקין על גבי מעטפות הפקדה:</b> ${envelopes ? 'כן' : 'לא'}<br>
      <b>דוח תואם לסכום במעטפה במזומן:</b> ${cash ? 'כן' : 'לא'}<br>
      <b>קלסר הפקדות מודיעין אזרחי תואם:</b> ${folder ? 'כן' : 'לא'}<br>
      <b>עד 6 מעטפות יומיות בכספת:</b> ${envelopesInDay ? 'כן' : 'לא'}<br>
      <b>הערות כספת:</b> ${safeNotes}<br><br>
      <b>:קופה</b><br>
      <b>קרן קופה תקין:</b> ${register ? 'כן' : 'לא'}<br>
      <b>דוח תואם לפדיון בקופה:</b> ${redemption ? 'כן' : 'לא'}<br>
      <b>בדיקת ביטול מזומן בקופה:</b> ${cashCancellation ? 'כן' : 'לא'}<br>
      <b>בדיקת זיכויים בסכומים חריגים:</b> ${unusualAmounts ? 'כן' : 'לא'}<br>
      <b>בדיקת שימוש בכרטיס "חבר מועדון":</b> ${clubMember ? 'כן' : 'לא'}<br>
      <b>בדיקת קופה קטנה (רשת):</b> ${smallRegister ? 'כן' : 'לא'}<br>
      <b>הערות קופה:</b> ${registerNotes}<br><br>
      <b>:ניהול מלאי</b><br>
      <b>תעודות פתוחות "נפרק בחנות" עד 5 ימים:</b> ${unloadedDocuments ? 'כן' : 'לא'}<br>
      <b>תעודות פתוחות אחרות עד 5 ימים:</b> ${otherDocuments ? 'כן' : 'לא'}<br>
      <b>ביקורת מלאי מדגמית מהמחסן:</b> ${warehouseStock ? 'כן' : 'לא'}<br>
      <b>הערות מלאי:</b> ${stockNotes}<br><br>
      <b>:נוכחות עובדים</b><br>
      <b>נוכחות עובדים בסניף:</b> ${employeeAttendance ? 'כן' : 'לא'}<br>
            <b>הערות נוכחות עובדים:</b> ${attendanceNotes}<br><br>
            <b>:תשאול עובדים</b><br>
            <b>הערות תשאול עובדים:</b> ${employeeNotes}<br>`,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
