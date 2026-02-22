
"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const [role, setRole] = useState<"student" | "instructor" | "admin" | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role?.toLowerCase();
            if (userRole === "instructor" || userRole === "admin" || userRole === "student") {
              setRole(userRole as any);
            } else {
              setRole("student");
            }
          } else {
            setRole("student");
          }
        } catch (error) {
          console.error("Error fetching role for sidebar:", error);
          setRole("student");
        } finally {
          setIsLoadingRole(false);
        }
      } else if (!isUserLoading) {
        setIsLoadingRole(false);
      }
    }
    fetchRole();
  }, [user, isUserLoading, db]);

  if (isUserLoading || isLoadingRole) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role || "student"} />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 h-9 w-9 rounded-xl hover:bg-primary/5" />
            <Separator orientation="vertical" className="mr-2 h-6" />
            <div className="hidden md:flex items-center relative w-72">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground/40" />
              <input
                type="search"
                placeholder="Search resources, knowledge, students..."
                className="pl-10 pr-4 py-2 w-full text-sm bg-muted/30 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-primary/5 transition-all">
              <Bell className="size-5 text-muted-foreground/60" />
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,100,150,0.5)]"></span>
            </Button>
            <div className="h-10 w-px bg-muted mx-2" />
            <Button variant="ghost" className="rounded-xl overflow-hidden border-2 border-primary/10 p-0 h-10 w-10">
              <User className="size-6 text-primary" />
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
