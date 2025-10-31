'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background animated-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animated-gradient">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShopSage</h1>
      <p className="mb-8">
        {user ? `You are logged in as ${user.email}` : 'Your one-stop shop for everything.'}
      </p>
      <div className="space-x-4">
        {user ? (
          <Button onClick={handleLogout} variant="outline" className="bg-white/30 backdrop-blur-sm">
            Logout
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/30 backdrop-blur-sm">
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
