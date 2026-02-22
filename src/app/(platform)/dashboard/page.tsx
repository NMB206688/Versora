
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

/**
 * A fallback redirect page for the /dashboard route.
 * Redirects the user to their role-specific dashboard.
 */
export default function DashboardRedirect() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      if (!isUserLoading && user) {
        // If the user is anonymous (Observer Mode)
        if (user.isAnonymous) {
          router.push("/dashboard/observatory");
          return;
        }

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const roleData = userDoc.data().role;
            const role = (Array.isArray(roleData) ? roleData[0] : roleData)?.toLowerCase() || "student";
            
            if (role === "instructor") {
              router.push("/dashboard/instructor");
            } else if (role === "admin") {
              router.push("/dashboard/admin");
            } else {
              router.push("/dashboard/student");
            }
          } else {
            router.push("/dashboard/student");
          }
        } catch (error) {
          console.error("Dashboard redirect error:", error);
          router.push("/dashboard/student");
        }
      } else if (!isUserLoading && !user) {
        router.push("/");
      }
    }
    redirect();
  }, [user, isUserLoading, db, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-3xl shadow-xl animate-bounce">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-primary uppercase tracking-[0.3em] animate-pulse">
            Nexus Routing
          </p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">Verifying session integrity...</p>
        </div>
      </div>
    </div>
  );
}
