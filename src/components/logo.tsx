import { Package } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ShopSage homepage">
      <div className="bg-primary p-2 rounded-lg">
        <Package className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-headline text-2xl font-bold text-foreground tracking-tight">
        ShopSage
      </span>
    </Link>
  );
}
