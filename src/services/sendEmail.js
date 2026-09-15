import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465, //25,465, 587, 2525
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const payload = {
//   from: UKR_NET_EMAIL,
//   to: 'sovig77280@hideam.com',
//   subject: 'Test email',
//   html: '<h1>Test email</h1>',
// };

const sendEmail = (payload) => {
  const email = { ...payload, from: UKR_NET_EMAIL };
  return transport
    .sendMail(email)
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error));
};

export default sendEmail;
