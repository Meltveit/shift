
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
import { useTranslations } from 'next-intl';

export default function SignupPage() {
  const t = useTranslations('SignupPage');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { id: 1, title: t('step1Title'), description: t('step1Description') },
    { id: 2, title: t('step2Title'), description: t('step2Description') },
    { id: 3, title: t('step3Title'), description: t('step3Description') },
  ];

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
                    <Label htmlFor="company-name">{t('companyNameLabel')}</Label>
                    <Input id="company-name" placeholder={t('companyNamePlaceholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="org-number">{t('orgNumberLabel')}</Label>
                    <Input id="org-number" placeholder={t('orgNumberPlaceholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">{t('industryLabel')}</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder={t('industryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">{t('industryRetail')}</SelectItem>
                        <SelectItem value="cafe">{t('industryCafe')}</SelectItem>
                        <SelectItem value="hotel">{t('industryHotel')}</SelectItem>
                        <SelectItem value="gym">{t('industryGym')}</SelectItem>
                        <SelectItem value="salon">{t('industrySalon')}</SelectItem>
                        <SelectItem value="other">{t('industryOther')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employee-count">{t('employeeCountLabel')}</Label>
                    <Select>
                      <SelectTrigger id="employee-count">
                        <SelectValue placeholder={t('employeeCountPlaceholder')} />
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
                     <p className="text-xs text-muted-foreground">{t('employeeCountHint')}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">{t('phoneLabel')}</Label>
                    <Input id="phone" type="tel" placeholder={t('phonePlaceholder')} />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                 <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">{t('fullNameLabel')}</Label>
                    <Input id="full-name" placeholder={t('fullNamePlaceholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('emailLabel')}</Label>
                    <Input id="email" type="email" placeholder={t('emailPlaceholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">{t('positionLabel')}</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder={t('positionPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">{t('positionOwner')}</SelectItem>
                        <SelectItem value="manager">{t('positionManager')}</SelectItem>
                        <SelectItem value="shift-manager">{t('positionShiftManager')}</SelectItem>
                        <SelectItem value="hr">{t('positionHr')}</SelectItem>
                        <SelectItem value="other">{t('positionOther')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="password">{t('passwordLabel')}</Label>
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('passwordPlaceholder')} />
                    <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="confirm-password">{t('confirmPasswordLabel')}</Label>
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
                           {t('acceptTerms')} <Link href="/terms" className="underline hover:text-primary">{t('termsAndConditions')}</Link> *
                        </Label>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Checkbox id="privacy" required />
                        <Label htmlFor="privacy" className="text-sm font-normal">
                            {t('acceptPrivacy')} <Link href="/privacy" className="underline hover:text-primary">{t('privacyPolicy')}</Link> *
                        </Label>
                    </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && <Button variant="outline" onClick={handleBack}>{t('backButton')}</Button>}
            {currentStep < steps.length && <Button onClick={handleNext} className={currentStep === 1 ? 'w-full' : ''}>{t('nextButton')}</Button>}
            {currentStep === steps.length && <Button asChild className="w-full"><Link href="/dashboard">{t('createAccountButton')}</Link></Button>}
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
            {t('alreadyHaveAccount')}
            <Link href="/login" className="underline">
              {t('loginLink')}
            </Link>
        </div>
      </div>
    </div>
  );
}
