import * as nodemailer from 'nodemailer';

export const sendEmail = async (email: string, id: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Jhon Doe 👻" <foo@example.com>', 
    to: email, 
    subject: 'Hello ✔', 
    text: 'Hello world?', 
    html: `<b>Hello world?</b> <a href="http://localhost:5000/api/auth/confirmation/${id}">confirm Email</a>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};