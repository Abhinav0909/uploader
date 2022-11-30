import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
dotenv.config();
export const transporter:nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SENDER!,
        pass:process.env.pass!,
    }
})
export const mailOptions = {
    from:process.env.SENDER!,
    to:process.env.RECEIVER!,
    subject:"You have successfully signed up with the application",
    text:"Dear User,You are welcome to use this application"
}
