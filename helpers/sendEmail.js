// const Mailjet = require("node-mailjet");

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE,
// });

// const sendEmail = async (data) => {
//   await mailjet.post("send", { version: "v3.1" }).request({
//     Messages: [
//       {
//         From: {
//           Email: MJ_SENDER_EMAIL,
//         },
//         To: [
//           {
//             Email: data.to,
//           },
//         ],
//         Subject: data.subject,
//         HTMLPart: data.html,
//       },
//     ],
//   });
//   return true;
// };

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDGRID_SENDER_EMAIL };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
