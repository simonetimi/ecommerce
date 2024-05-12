import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { sendOrderEmail } from '@/lib/mail';
import prisma from '@/utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEventAsync(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    console.log(email);
    if (!product || !email)
      return new NextResponse('Bad Request', { status: 400 });

    const data = { email, Orders: { create: { productId, pricePaidInCents } } };

    const {
      Orders: [order],
    } = await prisma.user.upsert({
      where: { email },
      create: data,
      update: data,
      select: { Orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });
    const downloadVerification = await prisma.downloadVerification.create({
      data: {
        productId,
        expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    await sendOrderEmail(email);
  }

  return new NextResponse();
}
