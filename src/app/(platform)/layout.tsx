
"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User, Loader2, LogOut, Settings, UserCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore, useAuth } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<"student" | "instructor" | "admin" | "observer" | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  // Maintenance mode real-time listener
  useEffect(() => {
    // Only set up the listener if the user is authenticated. 
    // This prevents "Missing or insufficient permissions" errors caused by 
    // requesting data before the Firebase Auth token is attached.
    if (!user) return;

    const maintenanceDocRef = doc(db, "systemSettings", "maintenance_mode");
    
    const unsub = onSnapshot(
      maintenanceDocRef, 
      (snap) => {
        if (snap.exists() && snap.data().enabled === true) {
          // If maintenance is ON and user is NOT admin, redirect to maintenance
          // We only check if role is resolved to avoid premature redirection.
          // Admins are exempt to allow them to turn it off.
          if (role && role !== "admin") {
            router.push("/maintenance");
          }
        }
      },
      async (serverError) => {
        // Handle listener failure with contextual error architecture
        const permissionError = new FirestorePermissionError({
          path: maintenanceDocRef.path,
          operation: 'get',
        } satisfies SecurityRuleContext);

        // Emit the error with the global error emitter
        errorEmitter.emit('permission-error', permissionError);
      }
    );
    return () => unsub();
  }, [db, user, role, router]);

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        if (user.isAnonymous) {
          setRole("observer");
          setIsLoadingRole(false);
          return;
        }

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
            {role === "observer" && (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] hidden sm:flex items-center gap-2">
                <Sparkles className="size-3 animate-pulse" /> Observer Preview
              </Badge>
            )}
            <div className="hidden lg:flex items-center relative w-72">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground/40" />
              <input
                type="search"
                placeholder="Search resources, knowledge..."
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-xl overflow-hidden border-2 border-primary/10 p-0 h-10 w-10">
                  <User className="size-6 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-primary/10">
                <DropdownMenuLabel className="font-headline font-bold px-4 pt-4 pb-2">
                  My Identity
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    {role === "observer" ? "Observer Mode" : user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2 bg-muted" />
                <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer group">
                  <UserCircle className="size-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-bold text-sm">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer group">
                  <Settings className="size-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-bold text-sm">Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2 bg-muted" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-3 cursor-pointer group text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-4 mr-2" />
                  <span className="font-bold text-sm">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
