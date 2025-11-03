
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const steps = [
  { id: 1, title: 'Bedriftsinformasjon', description: 'Opprett konto for din bedrift' },
  { id: 2, title: 'Din informasjon', description: 'Fortell oss hvem du er' },
  { id: 3, title: 'Juridisk', description: 'Nesten ferdig!' },
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-6 flex justify-center">
          <Icons.logo className="h-10 w-auto" />
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            <Progress value={progress} className="w-full mt-4" />
          </CardHeader>
          <CardContent>
            <form>
              {currentStep === 1 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Bedriftsnavn *</Label>
                    <Input id="company-name" placeholder="Kaffebaren AS" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="org-number">Organisasjonsnummer (valgfritt)</Label>
                    <Input id="org-number" placeholder="9 siffer" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Bransje *</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Velg bransje" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Butikk</SelectItem>
                        <SelectItem value="cafe">Restaurant/Kafé</SelectItem>
                        <SelectItem value="hotel">Hotell</SelectItem>
                        <SelectItem value="gym">Treningssenter</SelectItem>
                        <SelectItem value="salon">Frisør/Skjønnhet</SelectItem>
                        <SelectItem value="other">Annet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employee-count">Antall ansatte *</Label>
                    <Select>
                      <SelectTrigger id="employee-count">
                        <SelectValue placeholder="Velg antall" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="6-10">6-10</SelectItem>
                        <SelectItem value="11-20">11-20</SelectItem>
                        <SelectItem value="21-50">21-50</SelectItem>
                        <SelectItem value="51-100">51-100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                     <p className="text-xs text-muted-foreground">Dette hjelper oss å foreslå riktig plan</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input id="phone" type="tel" placeholder="+47 ..." />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                 <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">Fullt navn *</Label>
                    <Input id="full-name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-postadresse (jobbepost) *</Label>
                    <Input id="email" type="email" placeholder="john@kaffebaren.no" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Stilling *</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Velg din stilling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Eier</SelectItem>
                        <SelectItem value="manager">Daglig leder</SelectItem>
                        <SelectItem value="shift-manager">Manager</SelectItem>
                        <SelectItem value="hr">HR-ansvarlig</SelectItem>
                        <SelectItem value="other">Annet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="password">Passord *</Label>
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 tegn" />
                    <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="confirm-password">Bekreft passord *</Label>
                    <Input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} />
                     <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="grid gap-6">
                    <div className="flex items-start space-x-3">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm font-normal">
                            Jeg godtar Shifts <Link href="/terms" className="underline hover:text-primary">Vilkår og betingelser</Link> *
                        </Label>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Checkbox id="privacy" required />
                        <Label htmlFor="privacy" className="text-sm font-normal">
                            Jeg godtar Shifts <Link href="/privacy" className="underline hover:text-primary">Personvernerklæring</Link> *
                        </Label>
                    </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && <Button variant="outline" onClick={handleBack}>Tilbake</Button>}
            {currentStep < steps.length && <Button onClick={handleNext} className={currentStep === 1 ? 'w-full' : ''}>Neste</Button>}
            {currentStep === steps.length && <Button asChild className="w-full"><Link href="/dashboard">Opprett konto</Link></Button>}
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
            Har du allerede en konto?{" "}
            <Link href="/login" className="underline">
              Logg inn
            </Link>
        </div>
      </div>
    </div>
  );
}
