"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Award, 
  ChevronRight,
  BrainCircuit,
  Lightbulb,
  Search,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid
} from "recharts";

const skillData = [
  { subject: 'Critical Thinking', A: 85, fullMark: 100 },
  { subject: 'Quantum Physics', A: 65, fullMark: 100 },
  { subject: 'Macroeconomics', A: 42, fullMark: 100 },
  { subject: 'Data Structures', A: 88, fullMark: 100 },
  { subject: 'Academic Writing', A: 94, fullMark: 100 },
  { subject: 'Collaboration', A: 78, fullMark: 100 },
];

const growthTrend = [
  { month: 'Sep', score: 45 },
  { month: 'Oct', score: 52 },
  { month: 'Nov', score: 68 },
  { month: 'Dec', score: 75 },
  { month: 'Jan', score: 82 },
  { month: 'Feb', score: 85 },
];

export default function SkillsMapPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-muted/5 min-h-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-primary/10">
            <BrainCircuit className="size-4" /> Intelligence Profiling
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Dynamic Skills Map</h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            A real-time visualization of your academic DNA, synthesized from assignment performance and AI-detected competencies.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-2xl h-16 px-10 font-bold bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20">
          <Link href="/features/career-gateway">
            <TrendingUp className="size-5 mr-3" /> Career Projection
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <Card className="border-none shadow-[0_15px_50px_rgba(0,0,0,0.03)] bg-white rounded-[3rem] p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-headline font-bold">Competency Radar</h3>
                  <p className="text-muted-foreground font-medium">Your strength distribution across primary academic domains.</p>
                </div>
                <div className="space-y-6">
                  {skillData.slice(0, 3).map(skill => (
                    <div key={skill.subject} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span>{skill.subject}</span>
                        <span className="text-primary">{skill.A}%</span>
                      </div>
                      <Progress value={skill.A} className="h-2 bg-muted/50" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="rounded-xl border-primary/10 font-bold h-12 w-full">View Detailed Breakdown</Button>
              </div>
              <div className="w-full md:w-1/2 h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Student"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-[3rem] p-12">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-headline font-bold">Intelligence Velocity</h3>
                  <p className="text-muted-foreground font-medium">Rate of skill acquisition over the current semester.</p>
                </div>
                <Badge className="bg-green-500/10 text-green-600 border-none px-4 py-2 font-bold">+12.4% Acceleration</Badge>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dx={-10} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: 'hsl(var(--accent))', strokeWidth: 0 }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-primary text-primary-foreground border-none rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
            <div className="space-y-4 relative z-10">
              <Award className="size-12 text-accent" />
              <h4 className="text-2xl font-headline font-bold leading-tight">Mastery Certification Path</h4>
              <p className="opacity-70 text-sm leading-relaxed font-medium">
                You are 2 milestones away from a certified badge in <strong>Quantum Data Analysis</strong>.
              </p>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                 <span>Progress</span>
                 <span>84%</span>
              </div>
              <Progress value={84} className="h-2 bg-white/20" />
            </div>
            <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold relative z-10">Finish Path</Button>
          </Card>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold px-2">Growth Recommendations</h3>
            <div className="space-y-4">
              {[
                { title: "Advanced Calculus Seminar", icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-500/10" },
                { title: "Neural Networks Workshop", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
                { title: "Logic & Rhetoric Intensive", icon: Search, color: "text-orange-500", bg: "bg-orange-500/10" },
              ].map((rec, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-3xl border shadow-sm group cursor-pointer hover:border-primary/20 transition-all">
                  <div className={`p-3 rounded-2xl ${rec.bg} ${rec.color} group-hover:scale-110 transition-transform`}>
                    <rec.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{rec.title}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Boosts critical thinking by +12%</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}