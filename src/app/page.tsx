import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Repeat, Clock, Bot } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Icons.logo className="h-6 w-6" />
          <span className="sr-only">Shift</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Employee Scheduling, Simplified.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shift is a modern, intuitive platform for managing employee schedules, time off, and shift swaps,
                    powered by AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup" prefetch={false}>
                      Get Started
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything you need to manage your team
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides powerful tools to streamline your scheduling process and keep your team happy.
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
                    <CardTitle className="text-xl">Intuitive Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Easily create, manage, and view weekly schedules with a drag-and-drop interface. Keep track of
                      everyone's shifts in one place.
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
                    <CardTitle className="text-xl">Shift Swaps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Allow employees to request shift swaps with their colleagues, subject to manager approval.
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
                    <CardTitle className="text-xl">Time Off Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Employees can request time off, and managers can approve or deny requests, all within the app.
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
                    <CardTitle className="text-xl">AI-Powered Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Leverage AI to generate optimal shift plans based on employee availability, demand forecasts, and
                      labor costs.
                    </CardDescription>
                  </CardContent>
                </Card>
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
