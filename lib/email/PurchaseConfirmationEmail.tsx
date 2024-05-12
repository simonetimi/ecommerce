import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';

import OrderInformation from '@/lib/email/components/OrderInformation';

export interface PurchaseConfirmationEmailProps {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  downloadVerificationId: string;
}

PurchaseConfirmationEmail.PreviewProps = {
  product: {
    name: 'Behavior analysis for speech pathologists',
    imagePath: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/products/3969cfa2-114f-4312-aa60-75f0c7b08e9e-signature-series-v2-iphone-15.avif`,
    description:
      'This course is intended for speech pathologists who want to deepen their knowledge in behavior analysis.',
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 100000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseConfirmationEmailProps;

export default function PurchaseConfirmationEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseConfirmationEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt.</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-xl p-4">
            <h1>Purchase receipt</h1>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
