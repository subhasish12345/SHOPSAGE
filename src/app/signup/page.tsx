
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
  createUserWithEmailAndPassword,
  signInWithPhoneNumber
} from 'firebase/auth';
import { Chrome, Loader2, AlertCircle } from 'lucide-react';
import Logo from '@/components/logo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { setupRecaptcha, checkPhoneNumberExists } from '@/firebase/auth/phone-auth';


const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function SignUpPage() {
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
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setPopupError(null);

    const phoneExists = await checkPhoneNumberExists(values.phone);
    if (phoneExists) {
        form.setError('phone', { type: 'manual', message: 'This phone number is already in use.' });
        return;
    }
    
    try {
        const appVerifier = await setupRecaptcha('signup-button');
        const confirmationResult = await signInWithPhoneNumber(auth, values.phone, appVerifier);
        
        const verificationCode = prompt("Please enter the verification code sent to your phone.");
        
        if (verificationCode) {
            await confirmationResult.confirm(verificationCode);
            // User is signed in with phone, now create email/password credential and link it.
            // This is a simplified flow. For a real app, you might link credentials.
            // For now, we will create a new user with email/password.
            // But firebase auth will handle this for the currently logged in user.
            await createUserWithEmailAndPassword(auth, values.email, values.password);
        }
    } catch (error) {
        console.error("Error during sign up:", error);
        toast({
            title: 'Sign-up Error',
            description: 'Could not complete sign up. Please try again.',
            variant: 'destructive',
        });
    }
  }

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
          title: 'Sign-up Error',
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
            <h1 className="text-4xl font-bold tracking-tight font-headline">Create Your ShopSage Account</h1>
            <p className="mt-4 text-lg text-primary-foreground/80">Join as a User today. You can apply to become a Seller anytime.</p>
         </div>
      </div>
      <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-center w-full lg:hidden">
              <Logo />
          </div>
          <Card className="shadow-2xl rounded-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold tracking-tight font-headline">Sign Up</CardTitle>
              <CardDescription>Create your account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-10 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="h-10 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 890" {...field} className="h-10 focus:border-primary focus:shadow-sm" />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="h-10 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="h-10 focus:border-primary focus:shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button id="signup-button" type="submit" className="w-full !mt-4 h-10 text-base font-semibold hover:scale-[1.03] transition-transform hover:shadow-primary-50 shadow-lg">
                    Sign Up
                  </Button>
                </form>
              </Form>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full h-10 text-base" onClick={handleGoogleSignIn}>
                <Chrome className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>
               <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
                By signing up, you agree to ShopSage Terms of Service.
              </p>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
