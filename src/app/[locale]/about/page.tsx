import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('aboutUs')}</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  {t('missionTitle')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('missionDescription')}
                </p>
              </div>
              <Image
                src="https://picsum.photos/seed/team/1200/800"
                width="600"
                height="400"
                alt="Our Team"
                data-ai-hint="team business"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('meetTeamTitle')}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('meetTeamDescription')}
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2">
                  <Image src="https://picsum.photos/seed/person1/200/200" width={140} height={140} alt="Team Member" className="rounded-full" data-ai-hint="person portrait" />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{t('teamMember1Name')}</h3>
                    <p className="text-muted-foreground">{t('teamMember1Role')}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                   <Image src="https://picsum.photos/seed/person2/200/200" width={140} height={140} alt="Team Member" className="rounded-full" data-ai-hint="man portrait" />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{t('teamMember2Name')}</h3>
                    <p className="text-muted-foreground">{t('teamMember2Role')}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                   <Image src="https://picsum.photos/seed/person3/200/200" width={140} height={140} alt="Team Member" className="rounded-full" data-ai-hint="woman portrait" />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{t('teamMember3Name')}</h3>
                    <p className="text-muted-foreground">{t('teamMember3Role')}</p>
                  </div>
                </div>
              </div>
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
