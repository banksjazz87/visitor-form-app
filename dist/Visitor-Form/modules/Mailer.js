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
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.transporter.sendMail({
                from: `Visitor Form <${process.env.EMAIL_USER}>`,
                to: this.sendAddress,
                subject: "Testing the visitor app",
                text: "This worked!",
                html: "<h1>This is a test</h1>"
            });
            console.log(`Message Sent: ${info.messageId}`);
        });
    }
}
exports.Mailer = Mailer;
