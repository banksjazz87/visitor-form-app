const nodemailer = require("nodemailer");
import { VisitorDataPoints } from "../interfaces/interfaces";
import Handlebars from "handlebars";


export class Mailer {
    userEmail: any;
    userPassword: any;
    sendAddress: any;
    transporter: any;
    emailHTML: any;
    visitor: VisitorDataPoints;
    interests: string;

    constructor(userEmail: any, userPassword: any, sendAddress: string[], visitor: VisitorDataPoints, interests: string) {

        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.sendAddress = sendAddress;
        this.visitor = visitor;
        this.interests = interests;

        this.transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: this.userEmail,
                pass: this.userPassword,
            }
        });

        this.emailHTML = `<table style='width: 500px; border-spacing: 0; font-family:system-ui, -apple-system, BlinkMacSystemFont,  Segoe UI , Roboto, Oxygen, Ubuntu, Cantarell, Open Sans , Helvetica Neue , sans-serif;'>
        <thead>
            <tr>
                <th colspan='2' style='text-align: center; font-size: 24px; padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid black; background-color: #86198f; color: white; border-radius: 12px 12px 0px 0px;'>
                    Visitor Form
                </th>
            </tr>
        </thead>
        <tbody>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Name</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.title}} {{this.visitor.firstName}} {{this.visitor.lastName}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Address</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.address}} <br> {{this.visitor.city}}, {{this.visitor.State}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Phone</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.phone}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Email</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.email}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Preferred Contact</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.contact_method}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Interests</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.interests}}</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Prayer Requests</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>{{this.visitor.prayer_requests}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan='2' style='text-align: center; height: 40px; background-color: #86198f; color: white; border-radius: 0px 0px 12px 012px; padding: 0; border-spacing: 0;'>This form was submitted on</td>
            </tr>
        </tfoot>
    </table>`

    }



    async sendMail(): Promise<void> {
    const info = await this.transporter.sendMail({
        from: `Visitor Form <${process.env.EMAIL_USER}>`,
        to: this.sendAddress, 
        subject: "Testing the visitor app", 
        text: "This worked!",
        html: Handlebars.precompile(this.emailHTML),
    });

    console.log(`Message Sent: ${info.messageId}`);
  }
}