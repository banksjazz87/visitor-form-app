const nodemailer = require("nodemailer");

export class Mailer {
    userEmail: any;
    userPassword: any;
    sendAddress: any;
    transporter: any;

    constructor(userEmail: any, userPassword: any, sendAddress: string[]) {

        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.sendAddress = sendAddress;

        this.transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: this.userEmail,
                pass: this.userPassword,
            }
        });
    }

    async sendMail(): Promise<void> {
    const info = await this.transporter.sendMail({
        from: `Visitor Form <${process.env.EMAIL_USER}>`,
        to: this.sendAddress, 
        subject: "Testing the visitor app", 
        text: "This worked!",
        html: "<h1>This is a test</h1>"
    });

    console.log(`Message Sent: ${info.messageId}`);
  }
}