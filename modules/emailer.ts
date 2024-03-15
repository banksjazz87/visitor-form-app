const nodemailer = require("nodemailer");

class Mailer {
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

    
}