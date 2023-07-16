// const template = require("../template");
// import nodemailer from "nodemailer";
// import { Email, Host, Password } from "../config";
// export default class EmailService {
//   public emailSend({
//     email,
//     subject,
//     message,
//     link,
//   }: {
//     email: string;
//     subject: string;
//     message: string;
//     link?: string;
//   }): any {
//     const emailCredentials = {
//       from: Email,
//       to: email,
//       subject,
//       message,
//       html: link
//         ? template.linkEmail(message, link)
//         : template.normalMailBody(message),
//     };

//     return new Promise((resolve, reject) => {
//       const transport = nodemailer.createTransport({
//         service: Host,
//         auth: {
//           user: Email,
//           pass: Password,
//         },
//       });
//       transport
//         .sendMail(emailCredentials)
//         .then((info) => {
//           return resolve(info);
//         })
//         .catch((err) => {
//           return reject(err);
//         });
//     });
//   }
// }
