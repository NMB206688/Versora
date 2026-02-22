"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  Sparkles,
  Zap,
  ChevronRight,
  Filter,
  Building2,
  TrendingUp,
  LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CareerGatewayPage() {
  const jobs = [
    {
      title: "Quantum Systems Intern",
      company: "Nexus Labs",
      location: "San Francisco, CA (Remote)",
      type: "Internship",
      match: "98%",
      skills: ["Quantum Mechanics", "Python", "Data Structures"],
      color: "bg-blue-500"
    },
    {
      title: "Junior Data Architect",
      company: "Stellar Analytics",
      location: "New York, NY",
      type: "Full-time",
      match: "92%",
      skills: ["SQL", "Cloud Architecture", "Critical Thinking"],
      color: "bg-purple-500"
    },
    {
      title: "FinTech Research Analyst",
      company: "Global Capital Hub",
      location: "London, UK",
      type: "Contract",
      match: "85%",
      skills: ["Macroeconomics", "R", "Financial Modeling"],
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-muted/5 min-h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-accent/10">
            <TrendingUp className="size-4" /> Strategic Career Launch
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Career Opportunity Gateway</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            We've analyzed your skills map to curate opportunities where your intelligence profile provides a competitive advantage.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl h-16 px-8 border-primary/10 font-bold bg-white">
            <LayoutGrid className="size-5 mr-3" /> Talent Profile
          </Button>
          <Button className="rounded-2xl h-16 px-10 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
            Launch Job Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-5 h-6 w-6 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by role, company, or required skill..." 
                className="h-16 pl-14 pr-4 text-lg rounded-[1.5rem] border-none shadow-sm bg-white focus-visible:ring-primary/20"
              />
            </div>
            <Button variant="outline" className="h-16 w-16 rounded-[1.5rem] border-none shadow-sm bg-white">
              <Filter className="size-6 text-muted-foreground" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-headline font-bold">Curated Matches</h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sorted by AI Match Score</p>
            </div>
            
            {jobs.map((job, i) => (
              <Card key={i} className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
                <div className="p-10 flex flex-col md:flex-row md:items-center gap-10">
                  <div className={`size-20 rounded-[2rem] ${job.color}/10 flex items-center justify-center shrink-0`}>
                    <Building2 className={`size-10 ${job.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold px-3">{job.type}</Badge>
                        <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">{job.company}</span>
                      </div>
                      <h4 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground">
                        <span className="flex items-center gap-2"><MapPin className="size-4" /> {job.location}</span>
                        <span className="flex items-center gap-2"><Clock className="size-4" /> Posted 2d ago</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-muted text-muted-foreground border-none font-bold text-[9px] uppercase tracking-tighter px-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right space-y-4 min-w-[140px]">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Match Score</p>
                      <p className="text-3xl font-headline font-bold text-primary">{job.match}</p>
                    </div>
                    <Button className="w-full rounded-xl font-bold h-12 shadow-sm">Apply Now <ChevronRight className="size-4 ml-1" /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-secondary/30 border-none rounded-[3rem] p-10 space-y-8">
            <div className="space-y-2">
              <Sparkles className="size-10 text-accent" />
              <h4 className="text-2xl font-headline font-bold">Career Architect</h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Let our AI agent simulate different career pathways based on your elective choices and project portfolio.
              </p>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full rounded-2xl h-14 font-bold border-primary/10 bg-white shadow-sm">Simulate Pathway</Button>
              <Button className="w-full rounded-2xl h-14 font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/10">Request Referral</Button>
            </div>
          </Card>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold px-2">Industry Trends</h3>
            <div className="bg-white rounded-[2.5rem] border p-8 space-y-6 shadow-sm">
               {[
                 { label: "Quantum Computing", delta: "+24%", color: "text-green-500" },
                 { label: "Algorithmic Ethics", delta: "+18%", color: "text-green-500" },
                 { label: "Data Visualization", delta: "+8%", color: "text-blue-500" },
               ].map((trend, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="font-bold text-sm group-hover:text-primary transition-colors">{trend.label}</span>
                    <Badge variant="outline" className={`${trend.color} border-none font-bold text-xs`}>{trend.delta}</Badge>
                 </div>
               ))}
               <div className="pt-4 border-t">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Global Hiring Pulse: HIGH</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
