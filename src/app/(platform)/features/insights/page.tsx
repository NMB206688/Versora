"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  ArrowUpRight,
  Target,
  ChevronRight,
  BrainCircuit,
  Zap,
  Globe
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  AreaChart,
  Area
} from "recharts";

const engagementData = [
  { name: 'Week 1', active: 95, tasks: 88 },
  { name: 'Week 2', active: 92, tasks: 90 },
  { name: 'Week 3', active: 85, tasks: 82 },
  { name: 'Week 4', active: 78, tasks: 75 },
  { name: 'Week 5', active: 88, tasks: 85 },
  { name: 'Week 6', active: 94, tasks: 92 },
];

export default function InsightsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-muted/5 min-h-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-accent/10">
            <BarChart3 className="size-4" /> Neural Analytics
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Ecosystem Insights</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            Predictive analytics that flag at-risk patterns and suggest personalized interventions to maintain high learning velocity.
          </p>
        </div>
        <Button size="lg" className="rounded-2xl h-16 px-10 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
          <TrendingUp className="size-5 mr-3" /> Predict Outcomes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <Card className="border-none shadow-[0_15px_50px_rgba(0,0,0,0.03)] bg-white rounded-[3rem] p-12 space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-headline font-bold">Engagement Velocity</h3>
                <p className="text-muted-foreground font-medium">Comparison of active sessions vs. assignment completion.</p>
              </div>
              <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold uppercase text-[9px] px-3">TERM: FALL 2024</Badge>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dx={-10} />
                  <RechartsTooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="active" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(var(--accent))" fillOpacity={0} strokeWidth={3} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-white rounded-[2.5rem] p-8 space-y-6 group hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl">
                  <AlertCircle className="size-6 text-accent" />
                </div>
                <h4 className="text-xl font-headline font-bold">Predictive Intervention</h4>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                We've identified 5 students with a high probability of disengagement in the next 14 days.
              </p>
              <Button className="w-full rounded-xl h-12 font-bold bg-accent hover:bg-accent/90 shadow-sm">Review At-Risk List</Button>
            </Card>
            <Card className="border-none shadow-sm bg-white rounded-[2.5rem] p-8 space-y-6 group hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <BrainCircuit className="size-6 text-blue-500" />
                </div>
                <h4 className="text-xl font-headline font-bold">Concept Analytics</h4>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                "Quantum Entanglement" remains the most challenging concept across all cohorts.
              </p>
              <Button variant="secondary" className="w-full rounded-xl h-12 font-bold">Analyze Learning Gaps</Button>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-primary text-primary-foreground border-none rounded-[3rem] p-10 space-y-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-6 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Insight Pulse</span>
                </div>
                <h4 className="text-2xl font-headline font-bold leading-tight">Optimization Report</h4>
                <p className="opacity-70 text-sm leading-relaxed font-medium">
                  Instructional clarity in <strong>ECO202</strong> is up by 14% after implementing the suggested AI lecture nodes.
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                 <span>Status</span>
                 <span className="text-accent">OUTPERFORMING</span>
              </div>
           </Card>

           <div className="space-y-6">
              <h3 className="text-xl font-headline font-bold px-2">Cohort Health</h3>
              <div className="space-y-4">
                {[
                  { name: "Computer Science 101", count: 124, trend: "+5%", color: "text-blue-500" },
                  { name: "Global Economics 202", count: 45, trend: "-2%", color: "text-orange-500" },
                  { name: "Advanced History 105", count: 68, trend: "+12%", color: "text-purple-500" },
                ].map((cohort, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl border shadow-sm hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="space-y-1">
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{cohort.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{cohort.count} Scholars</p>
                    </div>
                    <Badge variant="outline" className={`border-none font-bold text-xs ${cohort.trend.startsWith('+') ? 'text-green-500' : 'text-accent'}`}>
                      {cohort.trend}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-center gap-2">
                 Generate Full Audit <ArrowUpRight className="size-4" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
