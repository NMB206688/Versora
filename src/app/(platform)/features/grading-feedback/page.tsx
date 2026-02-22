"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight,
  Clock,
  LayoutGrid,
  Search,
  Users
} from "lucide-react";

export default function GradingFeedbackPage() {
  const queue = [
    { student: "Alex Johnson", assignment: "Quantum Entanglement Lab", course: "CS101", status: "pending", time: "2h ago" },
    { student: "Sarah Miller", assignment: "Macroeconomic Theory Essay", course: "ECO202", status: "drafting", time: "1h ago" },
    { student: "Elena Rodriguez", assignment: "The Roman Empire Reflection", course: "HIST105", status: "pending", time: "12m ago" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-muted/5 min-h-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-primary/10">
            <Zap className="size-4" /> Intelligent Evaluation Hub
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Grading & Feedback Center</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            Streamline your evaluation workflow with AI-assisted rubric analysis and personalized constructive feedback generation.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl h-16 px-8 border-primary/10 font-bold bg-white">
            <LayoutGrid className="size-5 mr-3" /> Rubric Studio
          </Button>
          <Button className="rounded-2xl h-16 px-10 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
             Grade Next Submission
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-headline font-bold">Submission Queue</h3>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white border text-primary font-bold uppercase text-[9px] px-3">3 PENDING</Badge>
              <Badge variant="outline" className="bg-primary/5 border-primary/10 text-primary font-bold uppercase text-[9px] px-3">1 AI DRAFTING</Badge>
            </div>
          </div>

          <div className="space-y-6">
            {queue.map((item, i) => (
              <Card key={i} className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="size-16 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                      <Users className="size-8 text-muted-foreground/40" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{item.student}</h4>
                      <p className="text-sm font-medium text-muted-foreground">{item.assignment} • <span className="font-bold text-primary/60">{item.course}</span></p>
                      <div className="flex items-center gap-3 pt-1">
                         <Badge className={`text-[9px] font-bold uppercase tracking-widest ${item.status === 'drafting' ? 'bg-accent/10 text-accent animate-pulse' : 'bg-muted text-muted-foreground'} border-none`}>
                           {item.status}
                         </Badge>
                         <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-1">
                           <Clock className="size-3" /> {item.time}
                         </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" className="rounded-xl font-bold h-12 bg-muted/20 hover:bg-primary hover:text-white transition-all">Review</Button>
                    <Button className="rounded-xl font-bold h-12 shadow-sm gap-2">
                      <Sparkles className="size-4" /> Draft with AI
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-primary text-primary-foreground border-none rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <div className="space-y-4 relative z-10">
                <Sparkles className="size-10 text-accent animate-pulse" />
                <h4 className="text-2xl font-headline font-bold leading-tight">AI Strategy Engine</h4>
                <p className="opacity-70 text-sm leading-relaxed font-medium">
                  We've detected a recurring pattern of "Logical Gaps" in <strong>Module 3</strong> submissions.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl border border-white/10 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">Recommendation</p>
                <p className="text-sm font-medium">Inject a clarifying lecture node into Module 3 sequence.</p>
                <Button variant="link" className="p-0 h-auto text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">Apply Strategy <ArrowUpRight className="size-4" /></Button>
              </div>
           </Card>

           <div className="space-y-6">
              <h3 className="text-xl font-headline font-bold px-2">Grading Insights</h3>
              <div className="bg-white rounded-[2.5rem] border p-8 space-y-6 shadow-sm">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg. Evaluation Time</p>
                    <p className="text-3xl font-headline font-bold text-primary">4.2m <span className="text-sm font-medium text-green-500">-18%</span></p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Feedback Density</p>
                    <p className="text-3xl font-headline font-bold text-primary">High</p>
                 </div>
                 <div className="pt-4 border-t">
                    <div className="flex items-center gap-3 text-primary">
                       <CheckCircle2 className="size-5" />
                       <span className="text-xs font-bold uppercase tracking-widest">Ecosystem Healthy</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
