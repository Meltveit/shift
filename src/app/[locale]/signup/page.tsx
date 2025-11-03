'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';


export default function SignupPage() {
  const t = useTranslations('SignupPage');
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [orgNumber, setOrgNumber] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please check your password and try again.',
      });
      return;
    }
    if (!auth) {
        toast({
        variant: 'destructive',
        title: 'Authentication service not available',
        description: 'Please try again later.',
      });
      return
    };

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      
      // Here you would typically save the other form data (company info, etc.) to Firestore
      // For now, we'll just log it.
      console.log({
        uid: userCredential.user.uid,
        companyName,
        industry,
        employeeCount,
        phone,
        position,
      });

      toast({
        title: 'Account Created!',
        description: "We've created your account for you.",
      });

      router.push('/dashboard');

    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }

  }

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
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">{t('companyNameLabel')}</Label>
                    <Input id="company-name" placeholder={t('companyNamePlaceholder')} value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="org-number">{t('orgNumberLabel')}</Label>
                    <Input id="org-number" placeholder={t('orgNumberPlaceholder')} value={orgNumber} onChange={(e) => setOrgNumber(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">{t('industryLabel')}</Label>
                    <Select onValueChange={setIndustry} value={industry} required>
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
                    <Select onValueChange={setEmployeeCount} value={employeeCount} required>
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
                    <Input id="phone" type="tel" placeholder={t('phonePlaceholder')} value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                 <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">{t('fullNameLabel')}</Label>
                    <Input id="full-name" placeholder={t('fullNamePlaceholder')} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('emailLabel')}</Label>
                    <Input id="email" type="email" placeholder={t('emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">{t('positionLabel')}</Label>
                    <Select onValueChange={setPosition} value={position} required>
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
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="confirm-password">{t('confirmPasswordLabel')}</Label>
                    <Input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                     <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="grid gap-6">
                    <div className="flex items-start space-x-3">
                        <Checkbox id="terms" required checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(!!checked)} />
                        <Label htmlFor="terms" className="text-sm font-normal">
                           {t('acceptTerms')} <Link href="/terms" className="underline hover:text-primary">{t('termsAndConditions')}</Link> *
                        </Label>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Checkbox id="privacy" required checked={privacyAccepted} onCheckedChange={(checked) => setPrivacyAccepted(!!checked)} />
                        <Label htmlFor="privacy" className="text-sm font-normal">
                            {t('acceptPrivacy')} <Link href="/privacy" className="underline hover:text-primary">{t('privacyPolicy')}</Link> *
                        </Label>
                    </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && <Button variant="outline" onClick={handleBack} type="button">{t('backButton')}</Button>}
            {currentStep < steps.length && <Button onClick={handleNext} type="button" className={currentStep === 1 ? 'w-full' : ''}>{t('nextButton')}</Button>}
            {currentStep === steps.length && <Button onClick={handleSubmit} type="submit" className="w-full" disabled={loading || !termsAccepted || !privacyAccepted}>{loading ? 'Creating Account...' : t('createAccountButton')}</Button>}
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
