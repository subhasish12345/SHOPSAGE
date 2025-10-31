import { Package } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="ShopSage homepage">
      <div className="bg-primary p-2 rounded-lg">
        <Package className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="hidden sm:inline-block font-headline text-2xl font-bold text-foreground tracking-tight">
        ShopSage
      </span>
    </div>
  );
}
