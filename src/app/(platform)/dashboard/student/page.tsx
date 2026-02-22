"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function StudentDashboard() {
  const hero = PlaceHolderImages.find(img => img.id === "student-dashboard-hero");

  const courses = [
    { title: "Introduction to Quantum Physics", progress: 65, instructor: "Dr. Aris Thorne", category: "Science" },
    { title: "Global Economics 101", progress: 42, instructor: "Prof. Sarah Miller", category: "Finance" },
    { title: "Advanced Data Structures", progress: 88, instructor: "Elena Rodriguez", category: "CS" },
  ];

  const upcoming = [
    { title: "Quantum Entanglement Lab", due: "Today, 11:59 PM", type: "Assignment", urgency: "destructive" },
    { title: "Economics Weekly Reflection", due: "Tomorrow", type: "Discussion", urgency: "default" },
    { title: "Final Project Draft", due: "Oct 24", type: "Paper", urgency: "secondary" },
  ];

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-none bg-primary text-primary-foreground p-10 min-h-[320px] flex flex-col justify-end shadow-2xl">
        {hero && (
          <Image 
            src={hero.imageUrl} 
            alt={hero.description}
            fill
            className="object-cover opacity-30 pointer-events-none scale-105"
            priority
            data-ai-hint={hero.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="relative z-10 space-y-6 max-w-3xl">
          <Badge className="bg-accent/90 hover:bg-accent text-white font-headline border-none px-4 py-1.5 text-xs tracking-wider uppercase">
            Student Account: Alex Johnson
          </Badge>
          <h2 className="text-5xl font-headline font-bold leading-[1.1] tracking-tight">Your next academic leap <br/> starts here.</h2>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 px-8 font-bold shadow-xl shadow-black/10">
              <Play className="size-5 mr-2" /> Resume Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-2xl h-14 px-8 backdrop-blur-sm border-2">
              My Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Courses and Portfolio */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
                  <BookOpen className="text-primary size-7" /> Active Enrollments
                </h3>
                <p className="text-muted-foreground text-sm font-medium">Continue where you left off in your 3 active courses.</p>
              </div>
              <Button variant="outline" className="rounded-xl font-bold border-primary/10 hover:bg-primary/5">View Full Catalog</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.title} className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden group">
                  <div className="h-2 w-full bg-primary/10 group-hover:bg-primary transition-colors" />
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                       <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest">{course.category}</Badge>
                       <Trophy className="size-4 text-muted-foreground/30" />
                    </div>
                    <CardTitle className="text-xl leading-tight font-headline font-bold group-hover:text-primary transition-colors">{course.title}</CardTitle>
                    <CardDescription className="font-medium">{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                        <span>Course Completion</span>
                        <span className="text-primary">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2.5 bg-primary/5" />
                    </div>
                    <Button variant="secondary" className="w-full h-12 rounded-xl group font-bold bg-muted/50 hover:bg-primary hover:text-white transition-all">
                      Open Classroom <ArrowUpRight className="size-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-secondary/30 border-dashed border-2 border-primary/10 rounded-[2.5rem] shadow-none p-4">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-accent/10 rounded-2xl">
                  <Sparkles className="text-accent size-6" />
                </div>
                <div>
                  <CardTitle className="font-headline text-xl font-bold">Evidence-of-Learning Portfolio</CardTitle>
                  <CardDescription className="font-medium">
                    Showcase your academic achievements to instructors and peers.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-4 pt-4 px-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-shrink-0 w-44 h-28 bg-white rounded-2xl border shadow-sm flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-primary/20 transition-all">
                    <FileText className="size-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Artifact #{i}</span>
                  </div>
                ))}
                <button className="flex-shrink-0 w-44 h-28 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/60 hover:bg-primary/10 hover:scale-95 transition-all">
                  <Zap className="size-5 mb-1" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Add Artifact</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Deadlines and Feedback */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-headline font-bold flex items-center gap-3">
                <Clock className="text-primary size-5" /> Critical Deadlines
              </h3>
              <p className="text-xs text-muted-foreground font-medium">Prioritize these upcoming tasks.</p>
            </div>
            <div className="space-y-5">
              {upcoming.map((item) => (
                <div key={item.title} className="group flex items-start gap-4 p-5 rounded-2xl bg-muted/20 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${item.urgency === 'destructive' ? 'bg-destructive animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-primary/40'}`} />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[9px] font-bold py-0 h-4 uppercase tracking-widest border-primary/20">{item.type}</Badge>
                      <span className="text-[11px] font-medium text-muted-foreground">{item.due}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-bold text-primary hover:bg-primary/5 rounded-xl">View Calendar</Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold flex items-center gap-3 px-2">
              <MessageSquare className="text-primary size-5" /> AI Feedback Insights
            </h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-white border-none shadow-sm rounded-[1.5rem] hover:shadow-md transition-all group cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">Essay: The Industrial Revolution</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Global History 101</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-none font-bold">94/100</Badge>
                    </div>
                    <div className="p-3 bg-secondary/20 rounded-xl relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
                      <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-2 pl-2">
                        "Excellent use of primary sources. Your argumentation in the third paragraph was particularly strong and showed deep analysis..."
                      </p>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary font-bold text-xs">
                      Analyze detailed breakdown
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
