'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <PironaLogo className="w-6 h-6 text-primary" />
              <span className="text-lg font-headline">Pirona (Admin)</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="flex flex-col gap-2">
            <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="/">
                        <SidebarMenuButton>
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Back to Site</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/auth/admin">
                        <SidebarMenuButton>
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-secondary flex-1">
             <header className="p-4 flex justify-between items-center">
                <SidebarTrigger />
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">Admin User</span>
                     <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
