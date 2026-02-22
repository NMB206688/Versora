
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Eye,
  Layout
} from "lucide-react";
import Link from "next/link";

export default function ObservatoryHub() {
  const previews = [
    {
      title: "Student Observatory",
      description: "Explore the personalized learning environment, course progress tracking, and AI-powered writing tools.",
      href: "/dashboard/student",
      icon: GraduationCap,
      color: "bg-blue-500",
      accent: "text-blue-500",
      features: ["Active Enrollments", "Evidence Portfolio", "AI Feedback"]
    },
    {
      title: "Instructor Observatory",
      description: "Preview the command center for educators, featuring real-time class health metrics and AI strategy engines.",
      href: "/dashboard/instructor",
      icon: Users,
      color: "bg-orange-500",
      accent: "text-orange-500",
      features: ["Classroom Management", "Grading Queue", "Student Alerts"]
    },
    {
      title: "Admin Observatory",
      description: "Gain insight into the platform's high-level governance, system root console, and security protocols.",
      href: "/dashboard/admin",
      icon: ShieldCheck,
      color: "bg-purple-500",
      accent: "text-purple-500",
      features: ["System Root Console", "Global Config", "Ecosystem Logs"]
    }
  ];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-accent/10">
          <Sparkles className="size-3 animate-pulse" /> Platform Explorer Mode
        </div>
        <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Versora Observatory</h2>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
          Welcome, Observer. You are currently in a sandbox environment. Choose a specialized observatory below to preview how different roles experience the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previews.map((preview) => (
          <Card key={preview.title} className="border-none shadow-[0_15px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className={`h-2 w-full ${preview.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
            <CardHeader className="p-8 space-y-6">
              <div className={`p-4 rounded-2xl ${preview.color}/10 w-fit group-hover:scale-110 transition-transform`}>
                <preview.icon className={`size-8 ${preview.accent}`} />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-headline font-bold">{preview.title}</CardTitle>
                <CardDescription className="font-medium text-sm leading-relaxed">
                  {preview.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Core Subsystems</p>
                <div className="flex flex-wrap gap-2">
                  {preview.features.map(f => (
                    <Badge key={f} variant="secondary" className="bg-muted/50 text-muted-foreground border-none font-bold text-[9px] uppercase tracking-tighter px-2">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button asChild className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/10">
                <Link href={preview.href} className="flex items-center justify-center gap-2">
                  Enter Observatory <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-headline font-bold">Ready for a full identity?</h3>
            <p className="opacity-70 font-medium max-w-md">Observer Mode provides a high-level view. Create a verified institutional account to unlock full data persistence and AI collaboration.</p>
          </div>
          <Button asChild variant="outline" className="border-white/20 hover:bg-white/10 text-white h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-md">
            <Link href="/">Join the Nexus</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
