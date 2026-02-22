
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  // Logic to determine role could be here. Defaulting for now.
  return (
    <SidebarProvider>
      <AppSidebar role="student" />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="hidden md:flex items-center relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search courses, docs..."
                className="pl-9 pr-4 py-2 w-full text-sm bg-muted/50 rounded-full focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-accent"></span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border">
              <User className="size-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
