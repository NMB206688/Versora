
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
          setTimeout(() => setShowSplash(false), 800);
          return 100;
        }
        return prev + 1.2;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);

  // Intelligent Role-Based Redirection
  useEffect(() => {
    async function checkRoleAndRedirect() {
      if (!showSplash && !isUserLoading && user) {
        setIsRedirecting(true);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role?.toLowerCase() || "student";
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

  // SplashScreen Component Render
  if (showSplash || isRedirecting) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <div className="relative flex flex-col items-center space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px] animate-pulse" />
          
          <div className="bg-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] relative z-10 group transition-all">
            <Zap className="size-24 text-accent group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
          </div>
          
          <div className="text-center space-y-4 relative z-10">
            <h1 className="text-6xl font-headline font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Versora AI LMS</h1>
            <p className="text-white/40 font-bold tracking-[0.5em] uppercase text-[10px]">Intelligent Learning OS</p>
          </div>

          <div className="w-80 space-y-4 relative z-10 pt-4">
            <Progress value={splashProgress} className="h-1 bg-white/10" />
            <div className="flex justify-between text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">
              <span>{isRedirecting ? "Authenticating Persona" : "Neural Link Setup"}</span>
              <span>{isRedirecting ? "..." : `${Math.floor(splashProgress)}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Final Login UI Render
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-x-1/4 translate-y-1/4 blur-[160px]" />

      <div className="w-full max-w-md space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-6 bg-primary/10 rounded-[2.5rem] mb-6 shadow-sm border border-primary/5 group">
            <Zap className="text-primary size-12 group-hover:rotate-12 transition-transform" />
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight">Identity Access</h2>
          <p className="text-muted-foreground font-medium text-lg">Initialize your secure learning environment.</p>
        </div>

        <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
          <CardHeader className="space-y-2 pb-8 px-10 pt-10">
            <CardTitle className="text-3xl font-headline font-bold">Secure Login</CardTitle>
            <CardDescription className="text-base font-medium">Verify your institutional persona.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-10">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-6 top-5 size-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="Institutional Email" 
                    className="h-16 pl-14 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20 text-lg font-medium transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-5 size-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="Persona Key" 
                    className="h-16 pl-14 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20 text-lg font-medium transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-2">
                      <ShieldQuestion className="size-4" /> Reset Credentials
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-12 border-none shadow-2xl">
                    <DialogHeader className="space-y-4">
                      <DialogTitle className="font-headline text-3xl font-bold">Credential Recovery</DialogTitle>
                      <DialogDescription className="text-base font-medium">
                        Enter your verified email to receive a secure restoration link.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-10">
                      <Input
                        placeholder="verified@institution.edu"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="h-16 rounded-2xl bg-muted/40 border-none px-6 text-lg"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleResetPassword} 
                        disabled={isResetting || !resetEmail}
                        className="rounded-2xl w-full h-16 text-xl font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
                      >
                        {isResetting ? <Loader2 className="size-6 animate-spin" /> : "Request Link"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-2xl shadow-primary/20 transition-all active:scale-[0.97]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-6 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    Enter Workspace <ArrowRight className="size-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.4em]">
                <span className="bg-white/80 backdrop-blur-md px-6 text-muted-foreground/30">Guest Access</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-16 rounded-[1.5rem] border-2 border-primary/5 hover:bg-primary/5 font-bold text-lg transition-all group active:scale-[0.97]"
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
            >
              <Sparkles className="size-5 mr-3 text-accent group-hover:rotate-12 transition-transform" /> Explore Observer View
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-muted/10 bg-muted/5 p-10">
            <p className="text-center text-[11px] text-muted-foreground font-medium leading-relaxed max-w-[280px]">
              By initializing access, you agree to the <span className="text-primary font-bold cursor-pointer hover:underline">Nexus Protocols</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Digital Ethics</span> guidelines.
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-center gap-12 text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground/20">
          <span>SECURE_NODE: v2.1.2</span>
          <span>© 2024 VERSORA</span>
        </div>
      </div>
    </div>
  );
}
