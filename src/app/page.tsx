
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, Sparkles, ShieldQuestion } from "lucide-react";
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

  // Handle Splash Screen Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowSplash(false), 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // Role-Based Redirection Logic
  useEffect(() => {
    async function checkRoleAndRedirect() {
      if (!showSplash && !isUserLoading && user) {
        setIsRedirecting(true);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role?.toLowerCase() || "student";
            // Map roles to dashboard paths
            if (role === "instructor") {
              router.push("/dashboard/instructor");
            } else if (role === "admin") {
              router.push("/dashboard/admin");
            } else {
              router.push("/dashboard/student");
            }
          } else {
            // Default for new/unknown users
            router.push("/dashboard/student");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
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
        title: "Reset link sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not send reset email.",
      });
    } finally {
      setIsResetting(false);
    }
  };

  if (showSplash || isRedirecting) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <div className="relative flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] animate-pulse" />
          
          <div className="bg-white/10 p-8 rounded-[3rem] backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] relative z-10 group">
            <Zap className="size-20 text-accent group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <div className="text-center space-y-3 relative z-10">
            <h1 className="text-5xl font-headline font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Welcome to Versora</h1>
            <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-xs">Intelligent Learning Ecosystem</p>
          </div>

          <div className="w-72 space-y-4 relative z-10">
            <Progress value={splashProgress} className="h-1.5 bg-white/10" />
            <div className="flex justify-between text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
              <span>{isRedirecting ? "Authenticating Identity" : "Optimizing Environment"}</span>
              <span>{isRedirecting ? "..." : `${Math.floor(splashProgress)}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-x-1/4 translate-y-1/4 blur-[140px]" />

      <div className="w-full max-w-md space-y-10 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-5 bg-primary/10 rounded-[2.5rem] mb-6 shadow-sm border border-primary/5">
            <Zap className="text-primary size-12" />
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight">Identity Access</h2>
          <p className="text-muted-foreground font-medium text-lg">Sign in to your intelligent workspace.</p>
        </div>

        <Card className="border-none shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
          <CardHeader className="space-y-2 pb-8 px-10 pt-10">
            <CardTitle className="text-3xl font-headline font-bold">Secure Entry</CardTitle>
            <CardDescription className="text-base font-medium">Please provide your institutional credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-10">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-5 top-4.5 size-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    className="h-16 pl-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-lg font-medium transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-4.5 size-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="h-16 pl-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-lg font-medium transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-2">
                      <ShieldQuestion className="size-4" /> Recover Access
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-10">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="font-headline text-3xl font-bold">Credential Recovery</DialogTitle>
                      <DialogDescription className="text-base font-medium">
                        Enter your institutional email to receive an identity verification link.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-8">
                      <Input
                        placeholder="your@email.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="h-14 rounded-2xl bg-muted/30 border-none px-6"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleResetPassword} 
                        disabled={isResetting || !resetEmail}
                        className="rounded-2xl w-full h-14 text-lg font-bold shadow-lg shadow-primary/20"
                      >
                        {isResetting ? <Loader2 className="size-6 animate-spin" /> : "Request Reset Link"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-6 animate-spin" /> : "Initialize Workspace"}
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                <span className="bg-white/80 backdrop-blur-md px-6 text-muted-foreground/40">Continuum</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-16 rounded-[1.5rem] border-2 border-primary/5 hover:bg-primary/5 font-bold text-lg transition-all group"
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
            >
              <Sparkles className="size-5 mr-3 text-accent group-hover:rotate-12 transition-transform" /> Explore as Observer
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-muted/20 bg-muted/5 p-10">
            <p className="text-center text-xs text-muted-foreground font-medium leading-relaxed max-w-[280px]">
              By proceeding, you acknowledge the <span className="text-primary font-bold cursor-pointer hover:underline">Nexus Protocols</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Data Ethics</span> policies.
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
          <span>v2.1.0-STABLE</span>
          <span>NEURAL-OS</span>
          <span>© 2024 VERSORA</span>
        </div>
      </div>
    </div>
  );
}
