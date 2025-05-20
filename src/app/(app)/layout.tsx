import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}> {/* Or defaultOpen={false} for initially collapsed */}
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-sm md:px-6">
          {/* Mobile Sidebar Trigger: only show on mobile, hidden on md+ */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          
          {/* Placeholder for breadcrumbs or page title if needed in header */}
          <div className="hidden md:block">
            {/* <h1 className="text-lg font-semibold">Page Title</h1> */}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Any other header actions: search, notifications etc. */}
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Suspense fallback={<PageSkeleton />}>
            {children}
          </Suspense>
        </main>
        <footer className="border-t px-4 py-3 md:px-6 text-xs text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} TaskPilot. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
