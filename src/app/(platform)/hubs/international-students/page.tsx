"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Clock, 
  CheckCircle2, 
  Plane, 
  FileText, 
  MessageCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";

export default function InternationalHub() {
  const steps = [
    { title: "Visa Status Check", status: "completed", date: "Oct 12", icon: ShieldCheck, desc: "SEVIS ID verification completed." },
    { title: "I-20 Form Request", status: "in-progress", date: "In Progress", icon: FileText, desc: "Waiting for DSO signature." },
    { title: "Pre-Arrival Orientation", status: "pending", date: "Nov 5", icon: Globe, desc: "Mandatory virtual session." },
    { title: "Airport Pickup Request", status: "pending", date: "TBD", icon: Plane, desc: "Registration opens 2 weeks before arrival." },
  ];

  return (
    <div className="min-h-full bg-muted/5">
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        {/* Immersive Hero Header */}
        <div className="bg-primary rounded-[3rem] p-12 text-primary-foreground flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.15)]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-[60px]" />
          
          <div className="space-y-8 relative z-10 lg:max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full backdrop-blur-xl border border-white/20">
              <Sparkles className="size-4 text-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">International Student Success Hub</span>
            </div>
            <h2 className="text-6xl font-headline font-bold leading-[1.05] tracking-tight">Your global bridge to <br/> excellence.</h2>
            <p className="text-xl opacity-80 leading-relaxed font-medium">
              Seamlessly manage your visa compliance, cultural onboarding, and academic transition in our intelligent scholars environment.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-2xl h-16 px-10 font-bold shadow-2xl shadow-accent/30 text-lg group">
                <MessageCircle className="size-5 mr-3 group-hover:scale-110 transition-transform" /> Connect with Advisor
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-2xl h-16 px-8 backdrop-blur-md border-2 font-bold">
                 Travel Document Portal
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative z-10">
             <Card className="p-8 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl w-[320px] space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Compliance Health</p>
                    <Badge className="bg-green-500 text-white border-none text-[9px] px-3 font-bold tracking-widest">VALID</Badge>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xl font-headline font-bold">F-1 Student Visa</p>
                     <p className="text-[11px] font-medium opacity-60">Valid until March 2026</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold opacity-60 uppercase">
                       <span>Days Remaining</span>
                       <span>412 Days</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-accent w-4/5 shadow-[0_0_10px_rgba(255,100,150,0.5)]" />
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-bold h-12 text-sm">Download Digital I-20</Button>
                </div>
             </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Onboarding Timeline */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h3 className="text-3xl font-headline font-bold tracking-tight">Onboarding Navigator</h3>
                <p className="text-muted-foreground font-medium">Track your mandatory milestones and requirements.</p>
              </div>
              <Button variant="ghost" className="text-primary font-bold gap-2">History <ArrowRight className="size-4" /></Button>
            </div>
            
            <div className="relative space-y-6 pl-10 md:pl-0">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/10 rounded-full hidden md:block" />
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row items-center md:items-start gap-8 group">
                  <div className={`hidden md:flex absolute left-[calc(16px-28px/2)] top-8 z-10 h-7 w-7 rounded-full border-4 border-white shadow-md items-center justify-center ${step.status === 'completed' ? 'bg-green-500' : step.status === 'in-progress' ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                    {step.status === 'completed' && <CheckCircle2 className="size-3 text-white" />}
                  </div>
                  
                  <Card className="flex-1 w-full border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] hover:shadow-xl hover:border-primary/10 transition-all duration-500 overflow-hidden group">
                    <CardContent className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-center gap-8">
                        <div className={`p-5 rounded-2xl shrink-0 transition-colors ${step.status === 'completed' ? 'bg-green-500/10 text-green-600' : step.status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <step.icon className="size-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-headline font-bold text-2xl group-hover:text-primary transition-colors">{step.title}</p>
                          <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
                          <div className="flex items-center gap-3 pt-1">
                            <Badge variant="outline" className={`text-[9px] font-bold uppercase tracking-widest py-0.5 border-none ${step.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                              {step.status}
                            </Badge>
                            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">{step.date}</span>
                          </div>
                        </div>
                      </div>
                      {step.status !== 'completed' && (
                        <Button className="rounded-2xl h-14 px-8 font-bold text-base min-w-[160px] shadow-lg shadow-primary/5 transition-all">Resolve Now</Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-12">
             <Card className="border-none shadow-[0_20px_60px_rgba(0,0,0,0.04)] bg-accent/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-accent/10 rounded-xl">
                        <Calendar className="text-accent size-5" />
                     </div>
                     <CardTitle className="font-headline font-bold text-xl">Scholars Calendar</CardTitle>
                  </div>
                  <CardDescription className="font-medium">Curated local and global events.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-5">
                   {[
                     { title: "Global Gastronomy Fest", time: "Friday, 4:00 PM", loc: "Main Quad" },
                     { title: "CPT/OPT Compliance Workshop", time: "Monday, 10:00 AM", loc: "Virtual Hub" }
                   ].map((ev, i) => (
                     <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm space-y-3 border border-transparent hover:border-accent/20 transition-all group cursor-pointer">
                        <p className="font-bold text-base group-hover:text-accent transition-colors leading-tight">{ev.title}</p>
                        <div className="flex flex-col gap-1">
                          <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">{ev.time}</p>
                          <p className="text-[11px] font-medium text-muted-foreground">{ev.loc}</p>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto text-[11px] font-bold text-accent uppercase tracking-widest">Reserve Spotlight</Button>
                     </div>
                   ))}
                </CardContent>
             </Card>

             <div className="bg-white p-10 rounded-[2.5rem] border shadow-sm space-y-8">
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-xl flex items-center gap-3">
                    <Info className="size-5 text-primary" /> Global Guide
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">Resources for life in a new territory.</p>
                </div>
                <div className="space-y-3">
                   {[
                     { name: "Academic Transition Guide", color: "bg-blue-500" },
                     { name: "Global Health & Wellness", color: "bg-green-500" },
                     { name: "Banking & Financial Literacy", color: "bg-orange-500" },
                     { name: "Career Pathways for Visa Holders", color: "bg-primary" }
                   ].map(item => (
                     <button key={item.name} className="w-full text-left p-4 rounded-2xl bg-muted/20 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-bold flex items-center justify-between group">
                       <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.color} group-hover:bg-white transition-colors`} />
                          {item.name}
                       </div>
                       <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                     </button>
                   ))}
                </div>
                <div className="pt-4">
                   <div className="p-6 bg-primary/5 rounded-[1.5rem] border border-primary/10 flex flex-col items-center text-center gap-4">
                      <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Need 24/7 Assistance?</p>
                      <Button className="w-full rounded-xl font-bold h-12 shadow-sm">Emergency Global Hotline</Button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
