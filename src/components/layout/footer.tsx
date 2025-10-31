'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Categories', icon: LayoutGrid },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors',
                    isActive && 'text-primary'
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
      {/* Spacer for mobile content */}
      <div className="h-16 md:hidden" />

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-secondary border-t">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-muted-foreground text-sm">
                Your complete e-commerce destination for everything you need.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                <h3 className="font-semibold font-headline text-foreground mb-4">About</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">About Us</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Careers</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Press</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold font-headline text-foreground mb-4">Help</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Payments</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Shipping</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold font-headline text-foreground mb-4">Policy</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Return Policy</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Terms of Use</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Privacy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ShopSage. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
