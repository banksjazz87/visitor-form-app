const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
import { Visitor } from "../my-app/src/interfaces";


export class Mailer {
    userEmail: any;
    userPassword: any;
    sendAddress: any;
    transporter: any;
    emailHTML: any;
    interests: string;
    allVisitor: Visitor;

    constructor(userEmail: any, userPassword: any, sendAddress: string[], allVisitor: Visitor, interests: string) {

        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.sendAddress = sendAddress;
        this.interests = interests;
        this.allVisitor = allVisitor;

        this.transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: this.userEmail,
                pass: this.userPassword,
            }
        });
    }


    //Used to get the current date as a month/date/year.
    getDate(): string {
        const date = new Date();
        const stringOfDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return stringOfDate;
    }



    /**
     * @returns Promise<void>
     * @description this is used to send an email.
     */
    async sendMail(): Promise<void> {

        //compiler, being used compile the handlebars template.
        this.transporter.use('compile', hbs({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'templates/',
                defaultLayout: false,
                partialsDir: 'templates/',
            },
            viewPath: 'templates/',
            extName: '.hbs'
        }));


        //Actually sending the email.
        const info = await this.transporter.sendMail({
            from: `Visitor Form <${this.userEmail}>`,
            to: this.sendAddress, 
            subject: "New Chapel on the Hill Visitor Form", 
            template: 'email_template',
            context: {
                visitor: this.allVisitor, 
                interests: this.interests,
                date: this.getDate(),
            }
        });

        console.log(`Message Sent: ${info.messageId}`);
  }

}

