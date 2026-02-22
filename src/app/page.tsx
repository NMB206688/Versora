
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, Sparkles, ShieldQuestion, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth, useUser, useFirestore } from "@/firebase";
import { initiateAnonymousSignIn, initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  // Splash Screen Animation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Small delay before showing the login page for smooth transition
          setTimeout(() => setShowSplash(false), 800);
          return 100;
        }
        return prev + 1.25;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // Intelligent Role-Based Redirection
  useEffect(() => {
    async function checkRoleAndRedirect() {
      // Only redirect if the splash screen is gone and we have a user
      if (!showSplash && !isUserLoading && user) {
        setIsRedirecting(true);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const roleData = userDoc.data().role;
            // Handle both string and array role formats if necessary, defaulting to student
            const role = (Array.isArray(roleData) ? roleData[0] : roleData)?.toLowerCase() || "student";
            
            if (role === "instructor") {
              router.push("/dashboard/instructor");
            } else if (role === "admin") {
              router.push("/dashboard/admin");
            } else {
              router.push("/dashboard/student");
            }
          } else {
            // Default to student if no profile exists yet (e.g. first-time guest)
            router.push("/dashboard/student");
          }
        } catch (error) {
          console.error("Redirection error:", error);
          router.push("/dashboard/student");
        }
      }
    }

    checkRoleAndRedirect();
  }, [showSplash, isUserLoading, user, router, db]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    initiateEmailSignIn(auth, email, password);
  };

  const handleGuestLogin = () => {
    setIsLoggingIn(true);
    initiateAnonymousSignIn(auth);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) return;
    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: "Link Sent",
        description: "Password reset link sent to your institutional email.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reset link.",
      });
    } finally {
      setIsResetting(false);
    }
  };

  // Splash Screen: "Welcome to Versora AI LMS"
  if (showSplash || isRedirecting) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <div className="relative flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-1000">
          {/* Animated Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[160px] animate-pulse" />
          
          <div className="bg-white/10 p-12 rounded-[4rem] backdrop-blur-3xl border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative z-10 group transition-all hover:scale-105 duration-700">
            <Zap className="size-32 text-accent group-hover:rotate-12 transition-transform duration-700" />
          </div>
          
          <div className="text-center space-y-4 relative z-10">
            <h1 className="text-7xl font-headline font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Welcome to Versora
            </h1>
            <p className="text-white/50 font-bold tracking-[0.6em] uppercase text-xs">Intelligent Learning OS</p>
          </div>

          <div className="w-96 space-y-6 relative z-10 pt-8">
            <Progress value={splashProgress} className="h-1.5 bg-white/10" />
            <div className="flex justify-between text-[11px] font-bold opacity-40 uppercase tracking-[0.4em]">
              <span>{isRedirecting ? "Connecting Neural Node" : "Initializing Platform"}</span>
              <span>{isRedirecting ? "..." : `${Math.floor(splashProgress)}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Identity Access (Login) Page
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Immersive Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full -translate-x-1/4 translate-y-1/4 blur-[200px]" />

      <div className="w-full max-w-lg space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-8 bg-primary/10 rounded-[3rem] mb-4 shadow-sm border border-primary/5 group hover:bg-primary/20 transition-all cursor-pointer">
            <Zap className="text-primary size-14 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-6xl font-headline font-bold text-primary tracking-tight">Identity Access</h2>
            <p className="text-muted-foreground font-medium text-xl">Enter your secure workspace.</p>
          </div>
        </div>

        <Card className="border-none shadow-[0_50px_120px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden border border-white/20">
          <CardHeader className="space-y-3 pb-10 px-12 pt-12 text-center md:text-left">
            <CardTitle className="text-4xl font-headline font-bold">Sign In</CardTitle>
            <CardDescription className="text-lg font-medium opacity-70">Verify your academic persona.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-10 px-12">
            <form onSubmit={handleEmailLogin} className="space-y-8">
              <div className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-7 top-6 size-6 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="Institutional Email" 
                    className="h-20 pl-16 rounded-3xl bg-muted/40 border-none focus-visible:ring-primary/20 text-xl font-medium transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-7 top-6 size-6 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="Security Key" 
                    className="h-20 pl-16 rounded-3xl bg-muted/40 border-none focus-visible:ring-primary/20 text-xl font-medium transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-2">
                      <ShieldQuestion className="size-4" /> Reset Credentials
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[3rem] p-14 border-none shadow-3xl bg-white/95 backdrop-blur-xl">
                    <DialogHeader className="space-y-6">
                      <DialogTitle className="font-headline text-4xl font-bold">Credential Recovery</DialogTitle>
                      <DialogDescription className="text-lg font-medium">
                        Enter your verified email to receive a restoration link.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-12">
                      <Input
                        placeholder="verified@institution.edu"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="h-20 rounded-3xl bg-muted/40 border-none px-8 text-xl"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleResetPassword} 
                        disabled={isResetting || !resetEmail}
                        className="rounded-3xl w-full h-20 text-2xl font-bold shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90"
                      >
                        {isResetting ? <Loader2 className="size-7 animate-spin" /> : "Request Link"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button 
                type="submit" 
                className="w-full h-20 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-bold text-2xl shadow-3xl shadow-primary/30 transition-all active:scale-[0.98]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-8 animate-spin" /> : (
                  <span className="flex items-center gap-3">
                    Initialize Session <ArrowRight className="size-6" />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase font-bold tracking-[0.5em]">
                <span className="bg-white/90 backdrop-blur-md px-8 text-muted-foreground/40">Alternative Entry</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-20 rounded-[2rem] border-2 border-primary/5 hover:bg-primary/5 font-bold text-xl transition-all group active:scale-[0.98]"
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
            >
              <Sparkles className="size-6 mr-4 text-accent group-hover:rotate-12 transition-transform duration-500" /> Observer Mode
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 border-t border-muted/10 bg-muted/5 p-12">
            <p className="text-center text-xs text-muted-foreground font-medium leading-relaxed max-w-[320px]">
              Accessing Versora AI LMS signifies your agreement to the <span className="text-primary font-bold cursor-pointer hover:underline">Nexus Protocols</span>.
            </p>
            <div className="flex justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
              <span>Node_ID: V-24</span>
              <span>© 2024 VERSORA</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
