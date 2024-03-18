"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer = require("nodemailer");
class Mailer {
    constructor(userEmail, userPassword, sendAddress) {
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
        this.emailHTML = `<table style='width: 450px; margin: auto; border-spacing: 0; font-family:system-ui, -apple-system, BlinkMacSystemFont,  Segoe UI , Roboto, Oxygen, Ubuntu, Cantarell, Open Sans , Helvetica Neue , sans-serif;'>
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
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Mr. Mrs. Miss first and last name here</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Address</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Street address here <br> City, State Zip</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Phone</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Phone num here</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Email</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Email here</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Preferred Contact</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Preferred Contact</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Interests</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>List of interests here</td>
            </tr>
            <tr style='height: 40px;'>
                <td style='border-right: solid 1px black; border-left: solid 1px black; width: 30%; border-bottom: 1px solid black; font-size: 16px; padding: 20px 12px;'><strong>Prayer Requests</strong></td>
                <td style='border-bottom: 1px solid black; border-right: solid 1px black; font-size: 16px; padding: 20px 12px;'>Prayer Requests here</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan='2' style='text-align: center; height: 40px; background-color: #86198f; color: white; border-radius: 0px 0px 12px 012px; padding: 0; border-spacing: 0;'>This form was submitted on</td>
            </tr>
        </tfoot>
    </table>`;
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.transporter.sendMail({
                from: `Visitor Form <${process.env.EMAIL_USER}>`,
                to: this.sendAddress,
                subject: "Testing the visitor app",
                text: "This worked!",
                html: this.emailHTML,
            });
            console.log(`Message Sent: ${info.messageId}`);
        });
    }
}
exports.Mailer = Mailer;
