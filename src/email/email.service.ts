import { Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { InjectMongoDB } from '../database/injectDatabase.decorator';
import { CreateEmailDto } from './dto/create-email.dto';
import { Email, SavedEmail } from 'src/models/email.model';
import * as nodemailer from 'nodemailer';
import { getGrade } from './grade.util';
import * as docx from 'docx';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class EmailService {
  private emailModel: Collection<Email>;

  constructor(@InjectMongoDB() private readonly db: Db) {
    this.emailModel = this.db.collection('emails');
  }

  async create(email: CreateEmailDto) {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'roshcontrol@gmail.com', // your email address
        pass: 'tbxswoizyqmwzeeg', // your email password
      },
    });

    // Extract fields from the email object
    const {
      date,
      company,
      manager,
      employee1,
      employee2,
      employee3,
      employee4,
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
      address,
      cameras,
      emailAddress,
      managerOption,
      buzzerDetector,
      buzzersInItems,
      securityNotes,
      warehouseDoor,
      time,
    } = email;

    let htmlContent = '';

    if (managerOption === 'מנהל') {
      htmlContent = `
      <div dir="rtl">
      <b>תאריך:</b> ${date}<br>
      <b>שעה:</b> ${time}<br>
      <b>רשת:</b> ${company}<br>
      <b>כתובת הסניף:</b> ${address}<br>
      <b>שם ה${managerOption}:</b> ${manager}<br>
      <b>עובד 1:</b> ${employee1 ? employee1 : 'לא קיים'}<br>
      <b>עובד 2:</b> ${employee2 ? employee2 : 'לא קיים'}<br>
      <b>עובד 3:</b> ${employee3 ? employee3 : 'לא קיים'}<br>
      <b>עובד 4:</b> ${employee4 ? employee4 : 'לא קיים'}<br><br>
      <b>הערות נוכחות עובדים:</b> ${attendanceNotes ? attendanceNotes : "אין"}<br><br>
      <b>כספת:</b><br>
      <b>כספת תקנית:</b> ${safe ? 'כן' : 'לא'}<br>
      <b>מפתחות כספת בידי מנהל/זכיין:</b> ${keys ? 'כן' : 'לא'}<br>
      <b>רישום תקין על גבי מעטפות הפקדה:</b> ${envelopes ? 'כן' : 'לא'}<br>
      <b>דוח תואם לסכום במעטפה במזומן:</b> ${cash ? 'כן' : 'לא'}<br>
      <b>קלסר הפקדות מודיעין אזרחי תואם:</b> ${folder ? 'כן' : 'לא'}<br>
      <b>עד 6 מעטפות יומיות בכספת:</b> ${envelopesInDay ? 'כן' : 'לא'}<br>
      <b>מצלמות:</b> ${cameras ? 'כן' : 'לא'}<br>
      <b>הערות כספת:</b> ${safeNotes ? safeNotes : "אין"}<br><br>
      <b>קופה:</b><br>
      <b>קרן קופה תקין:</b> ${register ? 'כן' : 'לא'}<br>
      <b>דוח תואם לפדיון בקופה:</b> ${redemption ? 'כן' : 'לא'}<br>
      <b>בדיקת ביטול מזומן בקופה:</b> ${cashCancellation ? 'כן' : 'לא'}<br>
      <b>בדיקת זיכויים בסכומים חריגים:</b> ${unusualAmounts ? 'כן' : 'לא'}<br>
      <b>בדיקת שימוש בכרטיס "חבר מועדון":</b> ${clubMember ? 'כן' : 'לא'}<br>
      <b>בדיקת קופה קטנה (רשת):</b> ${smallRegister ? 'כן' : 'לא'}<br>
      <b>הערות קופה:</b> ${registerNotes ? registerNotes : "אין"}<br><br>
      <b>ניהול מלאי:</b><br>
      <b>תעודות פתוחות "נפרק בחנות" עד 5 ימים:</b> ${unloadedDocuments ? 'כן' : 'לא'}<br>
      <b>תעודות פתוחות אחרות עד 5 ימים:</b> ${otherDocuments ? 'כן' : 'לא'}<br>
      <b>ביקורת מלאי מדגמית מהמחסן:</b> ${warehouseStock ? 'כן' : 'לא'}<br>
      <b>הערות מלאי:</b> ${stockNotes ? stockNotes : "אין"}<br><br>
      <b>ביטחון:</b><br>
      <b>בדיקת גלאי זמזמים:</b> ${buzzerDetector ? 'כן' : 'לא'}<br>
      <b>בדיקת זמזמים בפריטים:</b> ${buzzersInItems ? 'כן' : 'לא'}<br>
      <b>דלת מחסן פנימית/חיצונית:</b> ${warehouseDoor ? 'כן' : 'לא'}<br>
      <b>הערות ביטחון:</b> ${securityNotes ? securityNotes : "אין"}<br><br>
      <b>נוכחות עובדים:</b><br>
      <b>נוכחות עובדים בסניף:</b> ${employeeAttendance ? 'כן' : 'לא'}<br><br>
      <b>תשאול עובדים:</b><br>
      <b>הערות תשאול עובדים:</b> ${employeeNotes ? employeeNotes : "אין"}<br>
      <br><br>
      <b>ציון:</b> ${getGrade(email)}
      </div>
    `;
    } else {
      htmlContent = `
      <div dir="rtl">
        <b>תאריך:</b> ${date}<br>
        <b>שעה:</b> ${time}<br>
        <b>רשת:</b> ${company}<br>
        <b>כתובת הסניף:</b> ${address}<br>
        <b>שם ה${managerOption}:</b> ${manager}<br>
        <b>עובד 1:</b> ${employee1 ? employee1 : 'לא קיים'}<br>
        <b>עובד 2:</b> ${employee2 ? employee2 : 'לא קיים'}<br>
        <b>עובד 3:</b> ${employee3 ? employee3 : 'לא קיים'}<br>
        <b>עובד 4:</b> ${employee4 ? employee4 : 'לא קיים'}<br><br>
        <b>כספת:</b><br>
        <b>כספת תקנית:</b> ${safe ? 'כן' : 'לא'}<br>
        <b>מפתחות כספת בידי מנהל/זכיין:</b> ${keys ? 'כן' : 'לא'}<br>
        <b>רישום תקין על גבי מעטפות הפקדה:</b> ${envelopes ? 'כן' : 'לא'}<br>
        <b>דוח תואם לסכום במעטפה במזומן:</b> ${cash ? 'כן' : 'לא'}<br>
        <b>קלסר הפקדות מודיעין אזרחי תואם:</b> ${folder ? 'כן' : 'לא'}<br>
        <b>עד 6 מעטפות יומיות בכספת:</b> ${envelopesInDay ? 'כן' : 'לא'}<br>
        <b>מצלמות:</b> ${cameras ? 'כן' : 'לא'}<br>
        <b>הערות כספת:</b> ${safeNotes ? safeNotes : "אין"}<br><br>
        <b>קופה:</b><br>
        <b>קרן קופה תקין:</b> ${register ? 'כן' : 'לא'}<br>
        <b>דוח תואם לפדיון בקופה:</b> ${redemption ? 'כן' : 'לא'}<br>
        <b>בדיקת ביטול מזומן בקופה:</b> ${cashCancellation ? 'כן' : 'לא'}<br>
        <b>בדיקת זיכויים בסכומים חריגים:</b> ${unusualAmounts ? 'כן' : 'לא'}<br>
        <b>בדיקת שימוש בכרטיס "חבר מועדון":</b> ${clubMember ? 'כן' : 'לא'}<br>
        <b>הערות קופה:</b> ${registerNotes ? registerNotes : "אין"}<br><br>
        <b>ניהול מלאי:</b><br>
        <b>תעודות פתוחות "נפרק בחנות" עד 5 ימים:</b> ${unloadedDocuments ? 'כן' : 'לא'}<br>
        <b>תעודות פתוחות אחרות עד 5 ימים:</b> ${otherDocuments ? 'כן' : 'לא'}<br>
        <b>ביקורת מלאי מדגמית מהמחסן:</b> ${warehouseStock ? 'כן' : 'לא'}<br>
        <b>ביטחון:</b><br>
        <b>בדיקת גלאי זמזמים:</b> ${buzzerDetector ? 'כן' : 'לא'}<br>
        <b>בדיקת זמזמים בפריטים:</b> ${buzzersInItems ? 'כן' : 'לא'}<br>
        <b>דלת מחסן פנימית/חיצונית:</b> ${warehouseDoor ? 'כן' : 'לא'}<br>
        <b>הערות ביטחון:</b> ${securityNotes ? securityNotes : "אין"}<br><br>  
        <b>הערות מלאי:</b> ${stockNotes ? stockNotes : "אין"}<br><br>
        <b>תשאול עובדים:</b><br>
        <b>הערות תשאול עובדים:</b> ${employeeNotes ? employeeNotes : "אין"}<br>
        <br><br>
        <b>ציון:</b> ${getGrade(email)}
        </div>
      `;
    }

    // Join the array elements into a single string separated by commas
    // const emails = emailAddress.map((email)=>`${email},`)
    // Define email options
    const saveEmail:SavedEmail ={
      address: address,
      company: company,
      date: date,
      emailAddress: emailAddress,
      htmlContent: htmlContent,
      time: time
    }
    await this.saveEmail(saveEmail);
    const mailOptions = {
      from: 'roshcontrol@gmail.com', // sender address
      to: `${emailAddress}`, // list of receivers `${emailAddress}`
      subject: 'ד"וח חדש נשלח', // Subject line
      html: htmlContent,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('email address', emailAddress);

  }

  async saveEmail(email: SavedEmail): Promise<void> {
    try {
      // Add any additional transformations or validations here if needed
      const result = await this.emailModel.insertOne(email);
      console.log('Email saved to database with id:', result.insertedId);
    } catch (error) {
      console.error('Error saving email to database:', error);
      throw error; // Rethrow or handle error as needed
    }
  }

  async getAllEmails(): Promise<SavedEmail[]> {
    try {
      return await this.emailModel.find().toArray();
    } catch (error) {
      console.error('Error retrieving emails from database:', error);
      throw error;
    }
  }

  async sendAgain(email: SavedEmail): Promise<void> {
    // Reuse the existing nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'roshcontrol@gmail.com', // your email address
        pass: 'tbxswoizyqmwzeeg', // your email password
      },
    });

    const mailOptions = {
      from: 'roshcontrol@gmail.com', // sender address
      to: email.emailAddress, // recipient address
      subject: 'ד"וח חוזר נשלח', // Subject line
      html: email.htmlContent, // html body from the saved email
    };

    // Send mail with defined transport object
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email re-sent to ${email.emailAddress}. Message ID: ${info.messageId}`);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error; // Rethrow or handle error as needed
    }
  }

 // Method to generate and send the Word file
 async createWordFile(email: CreateEmailDto, res: Response) {
  try {
    // Generate the Word document
    const doc = this.createWordDocument(email);

    // Convert the document to a buffer
    const Packer = require('docx').Packer;
    const buffer = await Packer.toBuffer(doc);

    // Set the response headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="report.docx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // Send the buffer as the response
    res.end(buffer);
  } catch (error) {
    console.error('Error generating Word file:', error);
    res.status(500).send('Error generating Word file');
  }
}


private createWordDocument(email: CreateEmailDto) {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun(`תאריך: ${email.date}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`שעה: ${email.time}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`רשת: ${email.company}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`כתובת הסניף: ${email.address}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`שם ה${email.managerOption}: ${email.manager}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`עובד 1: ${email.employee1 ? email.employee1 : 'לא קיים'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`עובד 2: ${email.employee2 ? email.employee2 : 'לא קיים'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`עובד 3: ${email.employee3 ? email.employee3 : 'לא קיים'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`עובד 4: ${email.employee4 ? email.employee4 : 'לא קיים'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות נוכחות עובדים: ${email.attendanceNotes ? email.attendanceNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`כספת תקנית: ${email.safe ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`מפתחות כספת בידי מנהל/זכיין: ${email.keys ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`רישום תקין על גבי מעטפות הפקדה: ${email.envelopes ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`דוח תואם לסכום במעטפה במזומן: ${email.cash ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`קלסר הפקדות מודיעין אזרחי תואם: ${email.folder ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`עד 6 מעטפות יומיות בכספת: ${email.envelopesInDay ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`מצלמות: ${email.cameras ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות כספת: ${email.safeNotes ? email.safeNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`קרן קופה תקין: ${email.register ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`דוח תואם לפדיון בקופה: ${email.redemption ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`בדיקת ביטול מזומן בקופה: ${email.cashCancellation ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`בדיקת זיכויים בסכומים חריגים: ${email.unusualAmounts ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`בדיקת שימוש בכרטיס "חבר מועדון": ${email.clubMember ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות קופה: ${email.registerNotes ? email.registerNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`תעודות פתוחות "נפרק בחנות" עד 5 ימים: ${email.unloadedDocuments ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`תעודות פתוחות אחרות עד 5 ימים: ${email.otherDocuments ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`ביקורת מלאי מדגמית מהמחסן: ${email.warehouseStock ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות מלאי: ${email.stockNotes ? email.stockNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`בדיקת גלאי זמזמים: ${email.buzzerDetector ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`בדיקת זמזמים בפריטים: ${email.buzzersInItems ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`דלת מחסן פנימית/חיצונית: ${email.warehouseDoor ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות ביטחון: ${email.securityNotes ? email.securityNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`נוכחות עובדים בסניף: ${email.employeeAttendance ? 'כן' : 'לא'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`הערות תשאול עובדים: ${email.employeeNotes ? email.employeeNotes : 'אין'}`)],
          }),
          new docx.Paragraph({
            children: [new docx.TextRun(`ציון: ${getGrade(email)}`)],
          }),
        ],
      },
    ],
  });

  return doc;
}
}
