"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSeparator,
  useSidebar,
} from "@/components/ui/sidebar"; // Ensure this path is correct for your custom sidebar
import { Logo } from "@/components/common/logo";
import { NAV_ITEMS_MAIN, NAV_ITEMS_SETTINGS } from "@/lib/constants";
import type { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { UserNav } from "./user-nav"; // For mobile view footer

export function AppSidebar() {
  const pathname = usePathname();
  const { open, state: sidebarState, isMobile } = useSidebar();

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => (
      <SidebarMenuItem key={item.href}>
        <Link href={item.href} passHref legacyBehavior>
          <SidebarMenuButton
            asChild={false} // Important: asChild={true} breaks with Link sometimes, use explicit <a> or button
            isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
            tooltip={{ children: item.title, hidden: open || isMobile }}
            className="justify-start"
          >
            <item.icon className="shrink-0" />
            <span className={sidebarState === "collapsed" && !isMobile ? "opacity-0" : ""}>{item.title}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar
      variant="sidebar" // or "floating", "inset"
      collapsible="icon" // or "offcanvas", "none"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
         {/* Logo visible when sidebar is open or on mobile */}
        <div className={cn(
            "transition-opacity duration-200",
            sidebarState === "collapsed" && !isMobile ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"
          )}>
          <Logo href="/dashboard" iconSize={24} textSize="text-xl" />
        </div>
        {/* Minimal logo/icon when collapsed and not mobile */}
        {sidebarState === "collapsed" && !isMobile && (
          <Link href="/dashboard" className="flex items-center justify-center h-[36px]">
             <Logo href="/dashboard" iconSize={28} textSize="text-2xl">
                <GanttChartSquare size={28} className="shrink-0 text-primary" />
             </Logo>
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {renderNavItems(NAV_ITEMS_MAIN)}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          {renderNavItems(NAV_ITEMS_SETTINGS)}
          {/* Logout button specifically for mobile, desktop UserNav is in header */}
          {isMobile && (
             <SidebarMenuItem>
                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
         {/* UserNav at the bottom for open sidebar on desktop, or when mobile */}
        {(open || isMobile) && sidebarState !== "collapsed" && (
          <div className="mt-4 p-2 border-t border-sidebar-border">
             {/* Placeholder for User info if needed directly in sidebar footer */}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

// Helper cn function if not globally available or for specific component styling
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Minimal Logo components to avoid circular dependency if Logo is complex
import { GanttChartSquare } from 'lucide-react';
const MinimalLogoIcon = () => <GanttChartSquare size={28} className="shrink-0 text-primary" />;
