"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Clock, 
  MessageSquare, 
  FileText, 
  ChevronRight,
  Sparkles,
  Zap,
  BookOpen,
  Trophy,
  ArrowUpRight,
  Target,
  LineChart,
  GraduationCap,
  Calendar,
  Search,
  Plus,
  Globe,
  Layout
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis
} from "recharts";

export default function StudentDashboard() {
  const hero = PlaceHolderImages.find(img => img.id === "student-dashboard-hero");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for Skills Map (derived from StudentSkillProficiency)
  const skillData = [
    { subject: 'Critical Thinking', A: 85, fullMark: 100 },
    { subject: 'Quantum Physics', A: 65, fullMark: 100 },
    { subject: 'Macroeconomics', A: 42, fullMark: 100 },
    { subject: 'Data Structures', A: 88, fullMark: 100 },
    { subject: 'Academic Writing', A: 94, fullMark: 100 },
    { subject: 'Collaboration', A: 78, fullMark: 100 },
  ];

  // Mock data for Momentum Planner (StudentGoal)
  const goals = [
    { id: 1, title: "Master Schrödinger's Equation", dueDate: "Oct 30", progress: 70, type: "Academic" },
    { id: 2, title: "Submit Final Research Paper", dueDate: "Nov 15", progress: 25, type: "Project" },
    { id: 3, title: "Internship Application", dueDate: "Dec 01", progress: 100, type: "Career" },
  ];

  const courses = [
    { title: "Introduction to Quantum Physics", progress: 65, instructor: "Dr. Aris Thorne", category: "Science", icon: <Zap className="size-4" />, color: "bg-blue-500" },
    { title: "Global Economics 101", progress: 42, instructor: "Prof. Sarah Miller", category: "Finance", icon: <LineChart className="size-4" />, color: "bg-orange-500" },
    { title: "Advanced Data Structures", progress: 88, instructor: "Elena Rodriguez", category: "CS", icon: <BookOpen className="size-4" />, color: "bg-purple-500" },
  ];

  const feedbackInsights = [
    { title: "The Industrial Revolution", grade: "94/100", context: "Global History 101", feedback: "Excellent use of primary sources. Your argumentation in the third paragraph was particularly strong..." },
    { title: "Quantum Lab Report", grade: "88/100", context: "Physics Lab", feedback: "Strong data analysis, but ensure your bibliography follows APA 7th Edition exactly." }
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto bg-muted/5 min-h-full">
      {/* Welcome Hero - Dynamic and Immersive */}
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border-none bg-primary text-primary-foreground p-8 md:p-12 min-h-[300px] flex flex-col justify-end shadow-2xl">
        {hero && (
          <Image 
            src={hero.imageUrl} 
            alt={hero.description}
            fill
            className="object-cover opacity-20 pointer-events-none scale-105"
            priority
            data-ai-hint={hero.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <Badge className="bg-accent/90 hover:bg-accent text-white font-headline border-none px-4 py-1.5 text-[10px] tracking-widest uppercase">
              Alex Johnson
            </Badge>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
              <Clock className="size-3" /> Last Active: 12m ago
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold leading-[1.1] tracking-tight">Your next academic leap <br/> starts here.</h2>
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 px-8 font-bold shadow-xl shadow-black/10 transition-all active:scale-95">
              <Play className="size-5 mr-2" /> Resume Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-2xl h-14 px-8 backdrop-blur-sm border-2 font-bold transition-all active:scale-95">
              My Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Left Column: Learning Progress and Goals */}
        <div className="lg:col-span-8 space-y-10">
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6 overflow-x-auto">
              <TabsList className="bg-white/50 border p-1 rounded-2xl h-14 shrink-0">
                <TabsTrigger value="overview" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Curriculum</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Skills Map</TabsTrigger>
              </TabsList>
              <Button variant="ghost" className="hidden md:flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors">
                Full Catalog <ChevronRight className="size-4" />
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Active Enrollments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.title} className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2rem] overflow-hidden group cursor-pointer">
                    <div className={`h-2 w-full ${course.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                         <div className={`p-2 rounded-lg ${course.color}/10 text-primary`}>
                            {course.icon}
                         </div>
                         <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-widest px-2">{course.category}</Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight font-headline font-bold group-hover:text-primary transition-colors">{course.title}</CardTitle>
                      <CardDescription className="text-xs font-medium">{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          <span>Completion</span>
                          <span className="text-primary">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5 bg-muted/50" />
                      </div>
                      <Button variant="secondary" className="w-full h-11 rounded-xl group font-bold bg-muted/30 hover:bg-primary hover:text-white transition-all text-xs">
                        Open Classroom <ArrowUpRight className="size-3 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add Course Placeholder */}
                <Card className="border-2 border-dashed border-primary/10 bg-transparent rounded-[2rem] flex items-center justify-center p-8 group cursor-pointer hover:bg-primary/5 transition-all">
                  <div className="text-center space-y-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Plus className="size-6 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enroll in a new course</p>
                  </div>
                </Card>
              </div>

              {/* Momentum Planner (StudentGoal Integration) */}
              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-headline text-xl font-bold flex items-center gap-3">
                      <Target className="size-6 text-accent" /> Momentum Planner
                    </CardTitle>
                    <CardDescription className="font-medium">Strategic goals for your current academic phase.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-primary/10 font-bold h-9 hover:bg-primary/5 transition-colors">Manage Goals</Button>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                   {goals.map(goal => (
                     <div key={goal.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`size-2 rounded-full ${goal.progress === 100 ? 'bg-green-500' : 'bg-accent'}`} />
                            <span className="text-sm font-bold">{goal.title}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <span>{goal.type}</span>
                            <span className="opacity-40">•</span>
                            <span>Due {goal.dueDate}</span>
                          </div>
                        </div>
                        <Progress value={goal.progress} className="h-1 bg-muted" />
                     </div>
                   ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Card className="border-none shadow-sm bg-white rounded-[2.5rem] p-10 min-h-[500px]">
                 <div className="flex flex-col md:flex-row gap-10 h-full">
                    <div className="flex-1 space-y-6">
                       <h3 className="text-2xl font-headline font-bold">Dynamic Skills Map</h3>
                       <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                         Your intelligence profile is generated by cross-referencing assignment performance with institutional learning outcomes.
                       </p>
                       <div className="space-y-4 pt-4">
                          <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 transition-all hover:shadow-lg hover:shadow-primary/5 group cursor-default">
                             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Core Competency</p>
                             <p className="text-lg font-headline font-bold text-primary group-hover:scale-[1.02] transition-transform origin-left">Academic Writing (94%)</p>
                          </div>
                          <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10 transition-all hover:shadow-lg hover:shadow-accent/5 group cursor-default">
                             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Growth Area</p>
                             <p className="text-lg font-headline font-bold text-accent group-hover:scale-[1.02] transition-transform origin-left">Macroeconomics (42%)</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 min-h-[350px]">
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
                             fillOpacity={0.3}
                           />
                         </RadarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
               </Card>
            </TabsContent>
            
            <TabsContent value="curriculum" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Card className="border-none shadow-sm bg-white rounded-[2.5rem] p-8 md:p-12 text-center space-y-6">
                  <div className="size-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary">
                    <Layout className="size-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold">Comprehensive Curriculum View</h3>
                    <p className="text-muted-foreground font-medium max-w-md mx-auto">Visualize your entire academic pathway and progress across all enrolled departments.</p>
                  </div>
                  <Button className="rounded-xl h-12 px-8 font-bold">Open Full Curriculum</Button>
               </Card>
            </TabsContent>
          </Tabs>

          {/* Evidence Portfolio (StudentPortfolioItem Integration) */}
          <Card className="bg-secondary/20 border-2 border-dashed border-primary/10 rounded-[2.5rem] shadow-none p-6 md:p-10 transition-all hover:bg-secondary/30">
            <CardHeader className="pb-8 px-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-primary/5">
                    <Sparkles className="text-accent size-8" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-2xl font-bold">Evidence-of-Learning Portfolio</CardTitle>
                    <CardDescription className="font-medium text-base">
                      Curate artifacts that demonstrate your mastery of specific skills.
                    </CardDescription>
                  </div>
                </div>
                <Button className="rounded-xl font-bold gap-2 h-14 px-8 shadow-xl shadow-primary/10 transition-all active:scale-95">
                  <Zap className="size-4" /> Generate AI Artifact
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video bg-white rounded-2xl border shadow-sm flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-primary/40 transition-all hover:scale-[1.05] relative overflow-hidden">
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-40">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <div className="size-1.5 rounded-full bg-primary" />
                    </div>
                    <FileText className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Artifact #{i}</span>
                  </div>
                ))}
                <button className="aspect-video bg-white/50 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 hover:bg-white hover:text-primary hover:border-primary/40 transition-all group">
                  <Plus className="size-6 mb-1 group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Add manually</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Deadlines, Feedback, and Hubs */}
        <div className="lg:col-span-4 space-y-10">
          {/* Critical Deadlines Hub */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border space-y-8 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3">
                  <Clock className="text-primary size-5" /> Critical Deadlines
                </h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Timeline Prioritization</p>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted transition-colors"><Calendar className="size-4 text-muted-foreground" /></Button>
            </div>
            
            <div className="space-y-5">
              {[
                { title: "Quantum Entanglement Lab", due: "Tonight, 11:59 PM", type: "Lab", priority: "critical" },
                { title: "Macroeconomic Reflection", due: "Tomorrow", type: "Discussion", priority: "high" },
                { title: "Bibliography Builder Check", due: "Oct 24", type: "Research", priority: "medium" },
              ].map((item, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                  <div className={`mt-1.5 h-3 w-3 rounded-full shrink-0 ${item.priority === 'critical' ? 'bg-destructive animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'bg-primary/40'}`} />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[8px] font-bold py-0 h-4 uppercase tracking-tighter border-primary/20">{item.type}</Badge>
                      <span className="text-[11px] font-medium text-muted-foreground">{item.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full h-14 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">Launch Study Planner</Button>
          </div>

          {/* AI Feedback Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-headline font-bold flex items-center gap-3">
                <Sparkles className="text-accent size-5" /> Intelligence Feed
              </h3>
              <Badge variant="outline" className="bg-white border-primary/10 text-[9px] font-bold px-3">2 NEW</Badge>
            </div>
            
            <div className="space-y-4">
              {feedbackInsights.map((insight, i) => (
                <Card key={i} className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[2rem] hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/10 overflow-hidden">
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1 flex-1">
                        <p className="text-base font-bold group-hover:text-primary transition-colors line-clamp-1">{insight.title}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">{insight.context}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] px-3">{insight.grade}</Badge>
                    </div>
                    <div className="p-5 bg-muted/30 rounded-2xl relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/40 rounded-l-2xl" />
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic line-clamp-2 pl-3">
                        "{insight.feedback}"
                      </p>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 group/btn">
                      Detailed Breakdown <ArrowUpRight className="size-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Specialized Success Hubs */}
          <div className="space-y-6">
             <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.3em] px-2">Ecosystem Hubs</h4>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-8 bg-white rounded-[2.5rem] border shadow-sm hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all group">
                   <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Globe className="size-6 text-blue-500 group-hover:text-inherit" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight">Global<br/>Success</span>
                </button>
                <button className="flex flex-col items-center justify-center p-8 bg-white rounded-[2.5rem] border shadow-sm hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all group">
                   <div className="size-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all">
                      <Trophy className="size-6 text-green-500 group-hover:text-inherit" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight">Athletic<br/>Gateway</span>
                </button>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default group">
           <Zap className="size-5 text-primary group-hover:scale-110 transition-transform" />
           <span className="text-[10px] font-bold uppercase tracking-[0.6em]">Versora Neural Architecture</span>
        </div>
      </div>
    </div>
  );
}
