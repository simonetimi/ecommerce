'use client';

import { FormEvent, useTransition } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button, Image, Spinner } from '@nextui-org/react';
import { Product } from '@prisma/client';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { formatCurrency } from '@/lib/formatters';

const CheckoutForm = ({
  product,
  clientSecret,
}: {
  product: Product;
  clientSecret: string;
}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
  );
  const { resolvedTheme } = useTheme();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <section className="my-8 flex w-4/5 flex-col gap-8 md:w-[450px]">
        <section className="flex gap-4">
          <Image width={150} alt={product.name} src={`/${product.imagePath}`} />
          <div className="flex flex-col justify-center gap-2">
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-neutral-400">{product.description}</p>
            </div>
            <p className="text-lg">
              {formatCurrency(product.priceInCents / 100)}
            </p>
          </div>
        </section>
        <Elements
          options={{
            clientSecret,
            locale: 'en',
            appearance: {
              theme: resolvedTheme === 'dark' ? 'night' : 'stripe',
            },
          }}
          stripe={stripePromise}
        >
          <Form priceInCents={product.priceInCents} />
        </Elements>
      </section>
    </main>
  );
};

export default CheckoutForm;

function Form({ priceInCents }: { priceInCents: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return null;
    // TODO: check for existing order
    startTransition(() => {
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
          },
        })
        .then(({ error }) => {
          if (
            error.type === 'card_error' ||
            error.type === 'validation_error'
          ) {
            toast.error(error.message);
          } else {
            toast.error('Unknown error occurred.');
          }
        });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-8">
        <CardHeader>
          <h1 className="text-xl">Payment checkout</h1>
        </CardHeader>
        <CardBody>
          <PaymentElement />
        </CardBody>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            disabled={!stripe || !elements || isPending}
            color="primary"
          >
            {isPending ? (
              <Spinner />
            ) : (
              `Purchase - ${formatCurrency(priceInCents / 100)}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
