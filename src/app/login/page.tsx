'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
} from 'firebase/auth';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Chrome, Loader2, Phone, AlertCircle } from 'lucide-react';
import Logo from '@/components/logo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { signInWithPhoneNumber } from 'firebase/auth';
import { setupRecaptcha } from '@/firebase/auth/phone-auth';

const formSchema = z.object({
  emailOrPhone: z.string().min(1, { message: 'Email or Phone is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [popupError, setPopupError] = useState<string | null>(null);


  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setPopupError(null);
    initiateEmailSignIn(auth, values.emailOrPhone, values.password);
  }

  const handlePhoneSignIn = async () => {
    if (!auth) return;
    const phoneNumber = prompt("Please enter your phone number with country code (e.g., +1234567890)");
    if (!phoneNumber) return;

    try {
        const appVerifier = await setupRecaptcha('phone-signin-button');
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        
        const verificationCode = prompt("Please enter the verification code sent to your phone.");
        if (verificationCode) {
            await confirmationResult.confirm(verificationCode);
            // User is signed in. The useUser hook will handle redirection.
        }
    } catch (error) {
        console.error("Error during phone sign-in:", error);
        toast({
            title: 'Phone Sign-in Error',
            description: 'Could not sign in with phone. Please check the number and try again.',
            variant: 'destructive',
        });
    }
  };


  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setPopupError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if ((error as AuthError).code === 'auth/popup-blocked') {
        setPopupError('Your browser blocked the Google Sign-In popup. Please allow popups for this site and try again.');
      } else {
        toast({
          title: 'Sign-in Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
      console.error('Error during Google sign-in:', error);
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-accent p-12 text-primary-foreground">
         <div className="absolute inset-0 bg-primary/80" />
         <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight font-headline">Welcome back to ShopSage</h1>
            <p className="mt-4 text-lg text-primary-foreground/80">Grow Smarter, Sell Faster.</p>
         </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center w-full">
              <Logo />
          </div>
          <Card className="shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold tracking-tight font-headline">Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              {popupError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Google Sign-In Blocked</AlertTitle>
                  <AlertDescription>
                    {popupError}
                  </AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="emailOrPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="h-12 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="h-12 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full !mt-8 h-12 text-base font-semibold hover:scale-[1.03] transition-transform hover:shadow-primary/50 shadow-lg">
                    Login
                  </Button>
                </form>
              </Form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 text-base" onClick={handleGoogleSignIn}>
                    <Chrome className="mr-2 h-5 w-5" />
                    Google
                  </Button>
                  <Button id="phone-signin-button" variant="outline" className="h-12 text-base" onClick={handlePhoneSignIn}>
                    <Phone className="mr-2 h-5 w-5" />
                    Phone
                  </Button>
              </div>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
