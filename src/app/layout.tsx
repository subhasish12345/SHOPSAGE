import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { SiteSidebar } from '@/components/site-sidebar';

export const metadata: Metadata = {
  title: 'ShopSage - Your Complete E-commerce Destination',
  description: 'A full-stack e-commerce ecosystem with multi-role architecture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <SidebarProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <SiteSidebar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
