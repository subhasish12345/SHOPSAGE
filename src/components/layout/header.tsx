'use client';

import Link from 'next/link';
import { Search, MapPin, ChevronDown, Mic, SlidersHorizontal, ShoppingCart, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center h-16 gap-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" className="text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Deliver to 110001</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for Products, Brands and More"
                className="pl-10 pr-24 h-11"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/profile">
                <User className="mr-2 h-5 w-5" /> Profile
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-5 w-5" /> Cart
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
