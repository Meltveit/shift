import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('PricingPage');
  const nav = useTranslations('Navigation');
  
  const tiers = [
     {
      name: t('freeTierName'),
      price: t('freeTierPrice'),
      priceDescription: t('priceDescription'),
      description: t('freeTierDescription'),
      features: [
        { text: t('featureEmployees'), value: t('freeTierFeature1') },
        { text: t('featureLocations'), value: t('freeTierFeature2') },
        { text: t('featureScheduling'), included: true },
        { text: t('featureClockIn'), included: true },
        { text: t('featureTimeCalc'), included: true },
        { text: t('featureNotifications'), included: false },
        { text: t('featureSwaps'), included: false },
        { text: t('featureTimeOff'), included: false },
        { text: t('featureAvailability'), included: false },
        { text: t('featureReports'), included: false },
        { text: t('featureRoles'), included: false },
        { text: t('featureAi'), included: false },
      ],
      cta: t('freeTierCTA')
    },
    {
      name: t('starterTierName'),
      price: t('starterTierPrice'),
      priceDescription: t('priceDescription'),
      description: t('starterTierDescription'),
      features: [
        { text: t('featureEmployees'), value: t('starterTierFeature1') },
        { text: t('featureLocations'), value: t('starterTierFeature2') },
        { text: t('featureScheduling'), included: true },
        { text: t('featureClockIn'), included: true },
        { text: t('featureTimeCalc'), included: true },
        { text: t('featureNotifications'), included: true },
        { text: t('featureSwaps'), included: false },
        { text: t('featureTimeOff'), included: false },
        { text: t('featureAvailability'), included: false },
        { text: t('featureReports'), included: false },
        { text: t('featureRoles'), included: false },
        { text: t('featureAi'), included: false },
      ],
      cta: t('starterTierCTA')
    },
    {
      name: t('proTierName'),
      price: t('proTierPrice'),
      priceDescription: t('priceDescription'),
      description: t('proTierDescription'),
      features: [
        { text: t('featureEmployees'), value: t('proTierFeature1') },
        { text: t('featureLocations'), value: t('proTierFeature2') },
        { text: t('featureScheduling'), included: true },
        { text: t('featureClockIn'), included: true },
        { text: t('featureTimeCalc'), included: true },
        { text: t('featureNotifications'), included: true },
        { text: t('featureSwaps'), included: true },
        { text: t('featureTimeOff'), included: true },
        { text: t('featureAvailability'), included: true },
        { text: t('featureReports'), included: true },
        { text: t('featureRoles'), included: false },
        { text: t('featureAi'), included: false },
      ],
      cta: t('proTierCTA')
    },
    {
      name: t('businessTierName'),
      price: t('businessTierPrice'),
      priceDescription: t('priceDescription'),
      description: t('businessTierDescription'),
       features: [
        { text: t('featureEmployees'), value: t('businessTierFeature1') },
        { text: t('featureLocations'), value: t('businessTierFeature2') },
        { text: t('featureScheduling'), included: true },
        { text: t('featureClockIn'), included: true },
        { text: t('featureTimeCalc'), included: true },
        { text: t('featureNotifications'), included: true },
        { text: t('featureSwaps'), included: true },
        { text: t('featureTimeOff'), included: true },
        { text: t('featureAvailability'), included: true },
        { text: t('featureReports'), included: true },
        { text: t('featureRoles'), included: true },
        { text: t('featureAi'), included: true },
      ],
      cta: t('businessTierCTA')
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
            {nav('about')}
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {nav('pricing')}
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {nav('login')}
          </Link>
          <Button asChild>
            <Link href="/signup" prefetch={false}>
              {nav('signup')}
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('pricing')}</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  {t('title')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('description')}
                </p>
              </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-md gap-8 sm:max-w-2xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
              {tiers.map((tier) => (
                <Card key={tier.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.name !== t('freeTierName') && <span className="text-muted-foreground">{tier.priceDescription}</span>}
                    </div>
                    <ul className="space-y-2 text-sm">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {feature.included === true && <Check className="h-4 w-4 text-primary" />}
                          {feature.included === false && <X className="h-4 w-4 text-muted-foreground" />}
                          <span>
                            {feature.text}
                            {feature.value && `: `}
                            <span className="font-semibold">{feature.value}</span>
                          </span>
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
