"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth, useUser } from "@/firebase";
import { initiateAnonymousSignIn, initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
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
      // Default to student dashboard for prototype purposes
      router.push("/dashboard/student");
    }
  }, [showSplash, isUserLoading, user, router]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    initiateEmailSignIn(auth, email, password);
    // Note: error handling is managed centrally by FirebaseErrorListener
  };

  const handleGuestLogin = () => {
    setIsLoggingIn(true);
    initiateAnonymousSignIn(auth);
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
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <Zap className="text-primary size-8" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to access your intelligent learning workspace.</p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-headline">Login</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    className="pl-10 h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-10 h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="size-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-bold">Or continue as</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 rounded-xl border-2 border-primary/10 hover:bg-primary/5 font-bold"
              onClick={handleGuestLogin}
              disabled={isLoggingIn}
            >
              <Sparkles className="size-4 mr-2 text-accent" /> Guest Preview
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t bg-muted/10 p-6">
            <p className="text-center text-xs text-muted-foreground font-medium">
              By signing in, you agree to Versora's <span className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">
          <span>v1.0.4-beta</span>
          <span>Intelligent OS</span>
          <span>© 2024 Versora AI</span>
        </div>
      </div>
    </div>
  );
}
