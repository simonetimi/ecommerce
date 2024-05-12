import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOrderEmail = async (email: string) => {
  const mailOptions = {
    from: 'Simone',
    to: email,
    subject: 'Order Confirmation',
    html: '<p>Test</p>',
  };
  return await transporter.sendMail(mailOptions);
};
