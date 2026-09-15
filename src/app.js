import formData from 'form-data';
import Mailgun from 'mailgun.js';
import 'dotenv/config';

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY,
});

const email = {
  from: `Excited User <mailgun@${MAILGUN_DOMAIN}>`,
  to: ['sovig77280@hideam.com'],
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!',
  html: '<h1>Testing some Mailgun awesomness!</h1>',
};

mg.messages
  .create(MAILGUN_DOMAIN, email)
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.error(err)); // logs any error
