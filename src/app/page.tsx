"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, Sparkles, ArrowRight, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth, useUser } from "@/firebase";
import { initiateAnonymousSignIn, initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  // Handle Splash Screen Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowSplash(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (!showSplash && !isUserLoading && user) {
      router.push("/dashboard/student");
    }
  }, [showSplash, isUserLoading, user, router]);

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

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <div className="relative flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          
          <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl relative z-10">
            <Zap className="size-16 text-accent animate-bounce" />
          </div>
          
          <div className="text-center space-y-2 relative z-10">
            <h1 className="text-4xl font-headline font-bold tracking-tight">Versora AI LMS</h1>
            <p className="text-white/60 font-medium tracking-widest uppercase text-xs">Initializing Intelligent Learning</p>
          </div>

          <div className="w-64 space-y-2 relative z-10">
            <Progress value={splashProgress} className="h-1.5 bg-white/10" />
            <div className="flex justify-between text-[10px] font-bold opacity-40 uppercase tracking-tighter">
              <span>System Core</span>
              <span>{splashProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-x-1/3 translate-y-1/3 blur-[120px]" />

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-[2rem] mb-4 shadow-sm border border-primary/5">
            <Zap className="text-primary size-10" />
          </div>
          <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Welcome Back</h2>
          <p className="text-muted-foreground font-medium">Sign in to your intelligent workspace.</p>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-1 pb-6 px-8 pt-8">
            <CardTitle className="text-2xl font-headline font-bold">Sign In</CardTitle>
            <CardDescription className="text-base">Access your courses and AI tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 size-5 text-muted-foreground/60" />
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 size-5 text-muted-foreground/60" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5">
                      <ShieldQuestion className="size-4" /> Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2rem]">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-xl">Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter your email address and we'll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        placeholder="your@email.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleResetPassword} 
                        disabled={isResetting || !resetEmail}
                        className="rounded-xl w-full"
                      >
                        {isResetting ? <Loader2 className="size-4 animate-spin" /> : "Send Reset Link"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/90 px-3 text-muted-foreground/60 font-bold tracking-widest">Or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-14 rounded-2xl border-2 border-primary/5 hover:bg-primary/5 font-bold text-base transition-all"
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
            >
              <Sparkles className="size-5 mr-2 text-accent" /> Try as Guest
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t bg-muted/10 p-8">
            <p className="text-center text-xs text-muted-foreground font-medium leading-relaxed">
              By signing in, you agree to Versora's <span className="text-primary font-bold cursor-pointer hover:underline">Terms</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          <span>Build 1.4.2</span>
          <span>Intelligent OS</span>
          <span>© 2024 Versora</span>
        </div>
      </div>
    </div>
  );
}
