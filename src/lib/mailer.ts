import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
export interface MailerBody {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const MAILER_BODY_DEFAULT_VALUE: MailerBody = {
  from: "",
  to: "",
  subject: "",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

class Mailer {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.SENDIN_BLUE_KEY,
      },
    });
  }

  send(body: MailerBody) {
    this.transporter
      .sendMail(body)
      .then((res: any) => {
        console.log("Mail send", res);
      })
      .catch((err: any) => console.log(err));
  }
}

const mailer = new Mailer();
export { mailer };
