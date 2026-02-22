
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
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = (userDoc.data().role || "student").toLowerCase();
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
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
          Routing to Workspace...
        </p>
      </div>
    </div>
  );
}
