import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      priceDescription: 'per user/month',
      description: 'For small teams just getting started.',
      features: [
        'Up to 10 users',
        'Basic scheduling',
        'Time off requests',
        'Mobile app access'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Pro',
      price: '$8',
      priceDescription: 'per user/month',
      description: 'For growing teams that need more power.',
      features: [
        'Everything in Free',
        'Unlimited users',
        'Shift swapping',
        'Reporting & analytics'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Business',
      price: '$15',
      priceDescription: 'per user/month',
      description: 'For businesses that need advanced features.',
      features: [
        'Everything in Pro',
        'AI schedule suggestions',
        'Labor cost optimization',
        'Priority support'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Icons.logo className="h-6 w-6" />
          <span className="sr-only">Shift</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/signup" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Find the perfect plan for your team
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose a plan that fits your needs. All plans come with a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-md gap-8 sm:max-w-2xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {tiers.map((tier) => (
                <Card key={tier.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.price !== '$0' && <span className="text-muted-foreground">{tier.priceDescription}</span>}
                    </div>
                    <ul className="space-y-2 text-sm">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{tier.cta}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Shift. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
