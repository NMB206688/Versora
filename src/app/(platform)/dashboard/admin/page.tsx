
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Database, 
  Zap, 
  ArrowUpRight, 
  Settings, 
  Cpu,
  Globe,
  Lock
} from "lucide-react";

export default function AdminDashboard() {
  const systemMetrics = [
    { label: "Active Nodes", value: "142", icon: Activity, color: "text-blue-500" },
    { label: "Neural Load", value: "24%", icon: Cpu, color: "text-purple-500" },
    { label: "Verified Entities", value: "1,204", icon: ShieldCheck, color: "text-green-500" },
    { label: "Database Health", value: "Optimal", icon: Database, color: "text-orange-500" },
  ];

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">System Root Console</h2>
          <p className="text-muted-foreground font-medium text-lg">Platform orchestration and high-level ecosystem oversight.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-primary/20 h-12 px-6 font-bold">
            <Lock className="size-4 mr-2" /> Security Audit
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl h-12 px-8 shadow-xl shadow-primary/20 font-bold">
            <Settings className="size-4 mr-2" /> Global Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => (
          <Card key={metric.label} className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2rem] group hover:shadow-xl transition-all overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</CardTitle>
              <div className={`p-2.5 rounded-xl bg-muted group-hover:bg-primary group-hover:text-white transition-all`}>
                <metric.icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{metric.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground/40 mt-1 flex items-center gap-1 uppercase">
                <ArrowUpRight className="size-3" /> Real-time Telemetry
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-headline font-bold">Platform Governance</h3>
            <Badge variant="outline" className="border-primary/10 text-primary font-bold uppercase tracking-widest text-[9px] px-3 h-6">Cluster: A-Primary</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-none shadow-sm bg-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-8">
                <div className="h-20 w-20 rounded-[2rem] bg-accent/10 flex items-center justify-center shrink-0">
                  <Zap className="size-10 text-accent animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold">Ecosystem Innovation Layer</h4>
                  <p className="text-muted-foreground font-medium max-w-sm">AI model refinement and curriculum automation strategies are performing at 98% efficiency.</p>
                </div>
              </div>
              <Button size="lg" className="rounded-2xl h-16 px-10 font-bold bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20">Review AI Logs</Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 space-y-6 group hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <Users className="size-6 text-blue-500" />
                  </div>
                  <h5 className="font-headline font-bold text-xl">User Orchestration</h5>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Manage access protocols for 1,200+ students and 45 faculty members.</p>
                <Button variant="secondary" className="w-full rounded-xl h-12 font-bold">Access Directory</Button>
              </Card>
              <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 space-y-6 group hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-2xl">
                    <Globe className="size-6 text-green-500" />
                  </div>
                  <h5 className="font-headline font-bold text-xl">Global Expansion</h5>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Coordinate international scholar hubs and multi-regional compliance nodes.</p>
                <Button variant="secondary" className="w-full rounded-xl h-12 font-bold">Regional Ops</Button>
              </Card>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold px-2">Security Perimeter</h3>
            <div className="bg-secondary/30 rounded-[2.5rem] p-8 space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm space-y-3 relative group cursor-pointer hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between">
                       <Badge className="bg-green-500/10 text-green-600 border-none text-[8px] font-bold tracking-tighter">SECURE</Badge>
                       <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">12:0{i} PM</span>
                    </div>
                    <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">Access point verified for Cluster {i}</p>
                    <p className="text-[10px] font-medium text-muted-foreground">Standard identity handshake completed via Auth Node.</p>
                 </div>
               ))}
            </div>
          </div>
          
          <Card className="bg-primary text-primary-foreground rounded-[2.5rem] border-none p-10 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h4 className="text-xl font-headline font-bold">Admin Privileges</h4>
              <p className="text-sm opacity-70 font-medium">You have unrestricted access to the core platform protocols. Use with discretion.</p>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
               <span>Session Identity</span>
               <span>ROOT-AUTH</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
