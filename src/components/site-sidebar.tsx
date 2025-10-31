'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Coins,
  PlusCircle,
  LayoutGrid,
  ShoppingBag,
  Heart,
  Ticket,
  User,
  Bell,
  HelpCircle,
  FileText,
  Languages,
  MoreHorizontal,
  LogOut,
  Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';

const menuItems = [
  { icon: Star, label: 'SuperCoin Zone' },
  { icon: PlusCircle, label: 'ShopSage Plus Zone' },
  { icon: LayoutGrid, label: 'All Categories', separator: true },
  { icon: MoreHorizontal, label: 'More on ShopSage' },
  { icon: Ticket, label: 'Offer Zone', separator: true },
  { icon: ShoppingBag, label: 'Sell on ShopSage' },
  { icon: ShoppingBag, label: 'My Orders' },
  { icon: Ticket, label: 'Coupons' },
  { icon: ShoppingBag, label: 'My Cart' },
  { icon: Heart, label: 'My Wishlist' },
  { icon: User, label: 'My Account' },
  { icon: Bell, label: 'Notification Preferences', separator: true },
  { icon: HelpCircle, label: 'Help Centre' },
  { icon: FileText, label: 'Legal' },
];

export function SiteSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Hello, User</p>
            <Link href="/profile" className="text-sm text-primary">View profile</Link>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <div key={index}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {item.separator && <SidebarSeparator />}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Languages />
              <span>Choose Language</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
