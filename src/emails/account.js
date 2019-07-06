const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API)

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'dajuancancode@gmail.com',
    subject: 'Thanks for signing up',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  }

  sgMail.send(msg)
}

const sendCancelEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'dajuancancode@gmail.com',
    subject: 'Sorry to see you go',
    text: `We've canceled your account at your request ${name}`
  }

  sgMail.send(msg)
}

module.exports = { sendWelcomeEmail, sendCancelEmail }