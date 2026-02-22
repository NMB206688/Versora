
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, Sparkles, ShieldQuestion, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth, useUser, useFirestore } from "@/firebase";
import { initiateAnonymousSignIn, initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        return prev + 2.5;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // Intelligent Role-Based Redirection
  useEffect(() => {
    async function checkRoleAndRedirect() {
      if (!showSplash && !isUserLoading && user) {
        setIsRedirecting(true);

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
          console.error("Redirection error:", error);
          router.push("/dashboard/student");
        }
      }
    }

    checkRoleAndRedirect();
  }, [showSplash, isUserLoading, user, router, db]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    
    if (mode === "login") {
      initiateEmailSignIn(auth, email, password);
    } else {
      initiateEmailSignUp(auth, email, password);
    }
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

  if (showSplash || isRedirecting) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <div className="relative flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          
          <div className="bg-white/10 p-8 rounded-[3rem] backdrop-blur-3xl border border-white/20 shadow-2xl relative z-10">
            <Zap className="size-20 text-accent" />
          </div>
          
          <div className="text-center space-y-2 relative z-10">
            <h1 className="text-5xl font-headline font-bold tracking-tighter">Versora AI LMS</h1>
            <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">Neural OS Initializing</p>
          </div>

          <div className="w-64 space-y-4 relative z-10">
            <Progress value={splashProgress} className="h-1 bg-white/10" />
            <div className="flex justify-between text-[9px] font-bold opacity-40 uppercase tracking-[0.2em]">
              <span>{isRedirecting ? "Syncing Identity" : "Initializing"}</span>
              <span>{Math.floor(splashProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-x-1/4 translate-y-1/4 blur-[120px]" />

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-sm border border-primary/5">
            <Zap className="text-primary size-8" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">
            {mode === "login" ? "Identity Access" : "Join the Nexus"}
          </h2>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-headline font-bold">
              {mode === "login" ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-sm font-medium opacity-70">
              {mode === "login" ? "Enter your institutional credentials" : "Begin your learning journey today"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                  <Input 
                    placeholder="First Name" 
                    className="h-12 rounded-2xl bg-muted/40 border-none px-4"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="h-12 rounded-2xl bg-muted/40 border-none px-4"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 size-5 text-muted-foreground/30" />
                  <Input 
                    type="email" 
                    placeholder="Institutional Email" 
                    className="h-12 pl-12 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Security Key</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="text-[10px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">
                           Forgot Key?
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2.5rem] border-none shadow-3xl bg-white/95 backdrop-blur-xl">
                        <DialogHeader className="space-y-4">
                          <DialogTitle className="font-headline text-3xl font-bold">Credential Recovery</DialogTitle>
                          <DialogDescription className="font-medium">
                            Enter your email to receive a restoration link.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                          <Input
                            placeholder="verified@institution.edu"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="h-14 rounded-2xl bg-muted/40 border-none px-6"
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleResetPassword} 
                            disabled={isResetting || !resetEmail}
                            className="rounded-2xl w-full h-14 font-bold bg-primary hover:bg-primary/90"
                          >
                            {isResetting ? <Loader2 className="size-5 animate-spin" /> : "Request Link"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 size-5 text-muted-foreground/30" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 pl-12 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-6 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    {mode === "login" ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
                    {mode === "login" ? "Initialize Session" : "Create Account"}
                  </span>
                )}
              </Button>
            </form>

            <div className="flex flex-col gap-4">
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted/30" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-[0.3em]">
                  <span className="bg-white/90 backdrop-blur-md px-4 text-muted-foreground/40">Ecosystem Options</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="ghost" 
                  className="h-12 rounded-2xl border border-primary/5 hover:bg-primary/5 font-bold text-sm"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                >
                  {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-12 rounded-2xl border-2 border-primary/5 hover:bg-primary/5 font-bold text-sm transition-all group"
                  onClick={handleGuestLogin}
                  disabled={isLoggingIn}
                >
                  <Sparkles className="size-4 mr-2 text-accent group-hover:rotate-12 transition-transform" /> Observer Mode
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t border-muted/10 bg-muted/5 p-8 text-center">
            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed max-w-[280px] mx-auto">
              By entering, you agree to our <span className="text-primary font-bold cursor-pointer hover:underline">Nexus Protocols</span> & <span className="text-primary font-bold cursor-pointer hover:underline">Intellectual Data Rights</span>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
