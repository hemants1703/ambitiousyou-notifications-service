import nodemailer, { SendMailOptions, Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // Add this line - required for SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(mailOptions: SendMailOptions): Promise<boolean | Error> {
    if (!mailOptions.to || !mailOptions.subject || !mailOptions.text || !mailOptions.html) {
      return new Error("Missing required fields: to, subject, text, html");
    }

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          reject(new Error("Error sending email"));
        } else {
          console.log("Email sent: ", info.messageId);
          resolve(info);
        }
      });
    });
  }
}

export default MailService;
