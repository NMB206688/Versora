
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Construction, BrainCircuit, Trophy, ArrowRight, RefreshCcw, Sparkles, ShieldCheck, LogIn } from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const PUZZLES = [
  { q: "What is 2 + 2 * 2?", a: ["6", "8", "4", "10"], c: 0 },
  { q: "Which planet is the Red Planet?", a: ["Venus", "Mars", "Jupiter", "Saturn"], c: 1 },
  { q: "What comes next: 2, 4, 8, 16, ...?", a: ["20", "24", "32", "64"], c: 2 },
  { q: "How many sides does a hexagon have?", a: ["5", "6", "7", "8"], c: 1 },
  { q: "What is the capital of France?", a: ["Berlin", "Madrid", "Paris", "Rome"], c: 2 },
  { q: "Which is the largest ocean?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], c: 3 },
  { q: "What is 15% of 200?", a: ["20", "25", "30", "35"], c: 2 },
  { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], c: 2 },
  { q: "Smallest prime number?", a: ["0", "1", "2", "3"], c: 2 },
  { q: "Which gas do plants breathe in?", a: ["Oxygen", "CO2", "Nitrogen", "Helium"], c: 1 },
  { q: "Square root of 144?", a: ["10", "11", "12", "14"], c: 2 },
  { q: "Fastest land animal?", a: ["Cheetah", "Lion", "Falcon", "Eagle"], c: 0 },
  { q: "Chemical symbol for Gold?", a: ["Ag", "Fe", "Au", "Pb"], c: 2 },
  { q: "Which year did man land on the moon?", a: ["1965", "1969", "1971", "1975"], c: 1 },
  { q: "Number of bits in a byte?", a: ["4", "8", "16", "32"], c: 1 },
  { q: "Hardest natural substance?", a: ["Iron", "Steel", "Diamond", "Quartz"], c: 2 },
  { q: "Who wrote 'Romeo and Juliet'?", a: ["Dickens", "Shakespeare", "Twain", "Homer"], c: 1 },
  { q: "How many continents are there?", a: ["5", "6", "7", "8"], c: 2 },
  { q: "What is 100 divided by 4?", a: ["20", "25", "30", "40"], c: 1 },
  { q: "Which color is a sapphire?", a: ["Red", "Green", "Blue", "Yellow"], c: 2 },
];

export default function MaintenancePage() {
  const { user } = useUser();
  const db = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);

  // Identify Admin status to show the escape button
  useEffect(() => {
    async function checkAdmin() {
      if (user && !user.isAnonymous) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role?.toLowerCase() === 'admin') {
          setIsAdmin(true);
        }
      }
    }
    checkAdmin();
  }, [user, db]);

  const handleAnswer = (idx: number) => {
    if (idx === PUZZLES[currentStep].c) {
      setWrongAnswer(null);
      if (currentStep + 1 < PUZZLES.length) {
        setCurrentStep(prev => prev + 1);
        setScore(prev => prev + 1);
      } else {
        setScore(prev => prev + 1);
        setIsFinished(true);
      }
    } else {
      setWrongAnswer(idx);
      setTimeout(() => setWrongAnswer(null), 500);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-primary-foreground relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />

      {/* Admin Escape Button */}
      {isAdmin && (
        <div className="absolute top-8 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-2xl h-12 px-6 font-bold backdrop-blur-xl group shadow-2xl">
            <Link href="/" className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-accent" />
              <span>Back to Live (Admin)</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl space-y-12 animate-in fade-in zoom-in duration-1000">
        {/* Maintenance Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl border border-white/20">
            <Construction className="size-5 text-accent" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Ecosystem Sync in Progress</span>
          </div>
          <h1 className="text-5xl font-headline font-bold tracking-tight">Undergoing Neural Evolution</h1>
          <p className="text-lg opacity-60 max-w-lg mx-auto font-medium leading-relaxed">
            Versora is currently scaling its intelligence layer. While we optimize the architecture, challenge yourself with our Neural Benchmarks.
          </p>
        </div>

        {!isFinished ? (
          <Card className="bg-white/10 backdrop-blur-2xl border-white/20 border-none shadow-3xl rounded-[3rem] overflow-hidden">
            <CardHeader className="p-10 pb-6 space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-white/20 text-white font-bold px-4 h-8 uppercase tracking-widest text-[10px]">
                  Step {currentStep + 1} of {PUZZLES.length}
                </Badge>
                <div className="flex items-center gap-2 text-accent">
                  <BrainCircuit className="size-5" />
                  <span className="text-sm font-bold tracking-tighter">IQ VELOCITY: {Math.round((score / (currentStep || 1)) * 160)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <Progress value={(currentStep / PUZZLES.length) * 100} className="h-1.5 bg-white/10" />
                <CardTitle className="text-3xl font-headline font-bold leading-tight text-white">
                  {PUZZLES[currentStep].q}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PUZZLES[currentStep].a.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    variant="outline"
                    className={`h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/20 text-white font-bold text-lg transition-all active:scale-[0.98] ${wrongAnswer === idx ? 'bg-destructive/40 border-destructive animate-shake' : ''}`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/10 backdrop-blur-2xl border-white/20 border-none shadow-3xl rounded-[3rem] p-12 text-center space-y-8 animate-in slide-in-from-bottom-8">
            <div className="size-24 bg-accent/20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
              <Trophy className="size-12 text-accent animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-headline font-bold">Benchmark Complete</h2>
              <p className="text-lg opacity-60 font-medium">Your academic synchronization is at 100%.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-4">
               <div className="flex justify-between items-center px-4">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40">Final Score</span>
                  <span className="text-3xl font-headline font-bold text-accent">{score}/{PUZZLES.length}</span>
               </div>
               <div className="flex justify-between items-center px-4">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40">Intelligence Rank</span>
                  <Badge className="bg-accent text-white border-none font-bold uppercase tracking-tighter px-4">VERSORA MASTER</Badge>
               </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={restart} variant="outline" className="flex-1 h-14 rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold">
                <RefreshCcw className="size-4 mr-2" /> Retry Benchmark
              </Button>
              <Button asChild className="flex-1 h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-bold shadow-xl shadow-black/20">
                <Link href="/">
                  Return to Nexus <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        )}

        <div className="flex justify-center pt-8">
          <div className="flex items-center gap-4 opacity-30 grayscale cursor-default group transition-all hover:grayscale-0">
             <Zap className="size-5 text-accent group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-[0.6em]">System Restoration in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
