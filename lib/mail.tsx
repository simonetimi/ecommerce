import { Order, Product } from '@prisma/client';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import PurchaseConfirmationEmail from '@/lib/email/PurchaseConfirmationEmail';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOrderEmail = async (
  email: string,
  order: Order,
  product: Product,
  downloadVerificationId: string,
) => {
  const mailOptions = {
    from: 'Simone',
    to: email,
    subject: 'Order Confirmation',
    html: render(
      <PurchaseConfirmationEmail
        order={order}
        product={product}
        downloadVerificationId={downloadVerificationId}
      />,
    ),
  };
  return await transporter.sendMail(mailOptions);
};
