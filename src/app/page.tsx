import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShopSage</h1>
      <p className="mb-8">Your one-stop shop for everything.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">signup</Link>
        </Button>
      </div>
    </div>
  );
}
