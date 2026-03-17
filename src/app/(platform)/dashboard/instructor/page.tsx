"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  AlertCircle, 
  ArrowUpRight, 
  Plus,
  MessageCircle,
  BarChart3,
  Sparkles,
  Search,
  Settings2,
  Bell
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function InstructorDashboard() {
  const courses = [
    { id: "cs101", title: "CS101: Computer Science Fundamentals", students: 124, pending: 12, health: "on track", color: "bg-blue-500" },
    { id: "eco202", title: "ECO202: Advanced Macroeconomics", students: 45, pending: 3, health: "attention", color: "bg-orange-500" },
    { id: "hist105", title: "HIST105: The Roman Empire", students: 68, pending: 0, health: "on track", color: "bg-purple-500" },
  ];

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Instructor Command Center</h2>
          <p className="text-muted-foreground font-medium">Real-time student progress and course optimization insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Find student or course..." className="pl-10 h-10 w-64 rounded-xl border-primary/10 bg-white" />
          </div>
          <Button asChild variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 h-10">
            <Link href="/features/insights">
              <BarChart3 className="size-4 mr-2" /> Global Stats
            </Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl h-10 shadow-lg shadow-primary/20">
            <Plus className="size-4 mr-2" /> New Course
          </Button>
        </div>
      </div>

      {/* High-Level Pulse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl group cursor-pointer hover:shadow-xl transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Scholars</CardTitle>
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <Users className="size-4 text-primary group-hover:text-inherit" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">237</div>
            <p className="text-[10px] text-green-500 font-bold mt-1.5 flex items-center gap-1">
              <ArrowUpRight className="size-3" /> +12 this term
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl group cursor-pointer hover:shadow-xl transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Course Completion</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <GraduationCap className="size-4 text-blue-500 group-hover:text-inherit" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">78.4%</div>
            <p className="text-[10px] text-blue-500 font-bold mt-1.5">Avg across all modules</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white border-l-4 border-accent rounded-3xl group cursor-pointer hover:shadow-xl transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-accent">Critical Alerts</CardTitle>
            <div className="p-2 bg-accent/10 rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
              <AlertCircle className="size-4 text-accent group-hover:text-inherit" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-accent">5</div>
            <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">Students flagged at-risk</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-primary text-primary-foreground rounded-3xl group cursor-pointer hover:scale-[1.02] transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest opacity-70">Grading Queue</CardTitle>
            <Plus className="size-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">15</div>
            <p className="text-[10px] opacity-70 mt-1.5 font-medium">Drafting feedback with AI</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-headline font-bold">Manage Classrooms</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter</Button>
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary">Sort by: Student Count</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-pointer rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0 flex items-stretch">
                  <div className={`w-3 ${course.color}`} />
                  <div className="p-8 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{course.title}</h4>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-2"><Users className="size-4 text-primary/40" /> {course.students} Scholars</span>
                        <span className="flex items-center gap-2 font-bold text-accent"><AlertCircle className="size-4" /> {course.pending} Pending</span>
                        <Badge className={`uppercase text-[10px] font-bold tracking-widest ${course.health === 'attention' ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'} border-none`}>
                          {course.health}
                        </Badge>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="lg" className="rounded-2xl h-14 w-14 bg-muted/30 group-hover:bg-primary group-hover:text-white transition-all">
                      <Link href={`/course/${course.id}`}>
                        <ArrowUpRight className="size-6" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold flex items-center gap-3 px-2">
              <Sparkles className="size-6 text-accent" /> AI Strategy Engine
            </h3>
            <Card className="bg-secondary/30 border-none rounded-[2.5rem] shadow-none overflow-hidden">
              <div className="p-8 space-y-6">
                <div className="p-6 bg-white rounded-3xl space-y-4 shadow-sm border-l-4 border-accent relative">
                  <Badge className="absolute top-4 right-4 bg-accent/10 text-accent border-none text-[8px] tracking-tighter">URGENT</Badge>
                  <p className="text-sm font-bold leading-tight pr-8">
                    Engagement in <span className="text-primary">ECO202</span> has decreased by 18% following Module 4.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-9 rounded-xl text-[11px] font-bold">Draft nudge</Button>
                    <Button variant="outline" size="sm" className="h-9 rounded-xl text-[11px] font-bold border-primary/10">Analyze drop</Button>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-3xl space-y-4 shadow-sm relative">
                  <Badge className="absolute top-4 right-4 bg-primary/10 text-primary border-none text-[8px] tracking-tighter">OPTIMIZATION</Badge>
                  <p className="text-sm font-bold leading-tight pr-8">
                    Assignment rubric for <span className="text-primary">Quantum Intro</span> could be more balanced for {new Date().getFullYear()} standards.
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary flex items-center gap-1">
                    Apply AI suggestions <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 px-2">
             <div className="flex items-center justify-between">
               <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em]">Platform Activity</h4>
               <Button variant="ghost" size="icon" className="h-6 w-6"><Settings2 className="size-4" /></Button>
             </div>
             <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <MessageCircle className="size-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">New discussion in CS101</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">"Instructor, I'm having trouble with the Big O..."</p>
                      <p className="text-[9px] font-bold text-muted-foreground/40 uppercase">12m ago</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
