import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Repeat, Clock, Bot } from 'lucide-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function LandingPage() {
  const t = useTranslations('LandingPage');
  const nav = useTranslations('Navigation');

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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    {t('heroTitle')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('heroDescription')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup" prefetch={false}>
                      {t('getStarted')}
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/scheduler/1200/800"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="app schedule"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('keyFeatures')}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  {t('featuresTitle')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('featuresDescription')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 lg:max-w-none">
              <div className="grid gap-1">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <CalendarCheck className="h-6 w-6" />
                     </div>
                    <CardTitle className="text-xl">{t('feature1Title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t('feature1Description')}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
               <div className="grid gap-1">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <Repeat className="h-6 w-6" />
                     </div>
                    <CardTitle className="text-xl">{t('feature2Title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t('feature2Description')}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
               <div className="grid gap-1">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <Clock className="h-6 w-6" />
                     </div>
                    <CardTitle className="text-xl">{t('feature3Title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t('feature3Description')}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
               <div className="grid gap-1">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        <Bot className="h-6 w-6" />
                     </div>
                    <CardTitle className="text-xl">{t('feature4Title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                     {t('feature4Description')}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">{t('footerRights')}</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {t('footerTerms')}
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {t('footerPrivacy')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
