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
const hbs = require("nodemailer-express-handlebars");
class Mailer {
    constructor(userEmail, userPassword, sendAddress, allVisitor, interests) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.sendAddress = sendAddress;
        this.interests = interests;
        this.allVisitor = allVisitor;
        this.transporter = nodemailer.createTransport({
            host: "mail.noip.com",
            port: 587,
            secure: false,
            pool: true,
            auth: {
                user: this.userEmail,
                pass: this.userPassword,
            },
            tls: {
                rejectUnauthorized: false
            },
            maxMessage: Infinity,
            maxConnections: 5,
            debug: true,
            logger: true
        });
    }
    //Used to get the current date as a month/date/year.
    getDate() {
        const date = new Date();
        const stringOfDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return stringOfDate;
    }
    /**
     * @returns Promise<void>
     * @description this is used to send an email.
     */
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            //compiler, being used to compile the handlebars template.
            this.transporter.use("compile", hbs({
                viewEngine: {
                    extname: ".hbs",
                    layoutsDir: "templates/",
                    defaultLayout: false,
                    partialsDir: "templates/",
                    helpers: {
                        ifNotNegativeAge: function (a) {
                            return a === -1 ? "" : `(${a})`;
                        },
                    },
                },
                viewPath: "templates/",
                extName: ".hbs",
            }));
            //Actually sending the email.
            const info = yield this.transporter.sendMail({
                from: `Visitor Form <${this.userEmail}>`,
                to: this.sendAddress,
                subject: "New Chapel on the Hill Visitor Form",
                template: "email_template",
                context: {
                    visitor: this.allVisitor,
                    interests: this.interests,
                    date: this.getDate(),
                },
            });
            console.log(`Message Sent: ${info.messageId}`);
        });
    }
}
exports.Mailer = Mailer;
