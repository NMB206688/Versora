"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Lock,
  Construction,
  Sparkles,
  AlertTriangle,
  Plus,
  Briefcase,
  Calendar,
  MoreVertical,
  Edit3,
  Trash2,
  Search,
  CloudUpload
} from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Ecosystem Mock State for CRUD demo
  const [jobs, setJobs] = useState([
    { id: "j1", title: "Quantum Systems Intern", company: "Nexus Labs", type: "Internship" },
    { id: "j2", title: "Data Architect", company: "Stellar Analytics", type: "Full-time" },
  ]);

  const [events, setEvents] = useState([
    { id: "e1", title: "Global Gastronomy Fest", date: "Oct 25", loc: "Main Quad" },
    { id: "e2", title: "AI Compliance Workshop", date: "Nov 02", loc: "Virtual Hub" },
  ]);

  // Fetch current maintenance status
  useEffect(() => {
    async function fetchStatus() {
      try {
        const docRef = doc(db, "systemSettings", "maintenance_mode");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMaintenanceEnabled(docSnap.data().enabled === true);
        }
      } catch (e) {
        console.error("Error fetching status", e);
      }
    }
    fetchStatus();
  }, [db]);

  const toggleMaintenance = async (checked: boolean) => {
    setIsUpdating(true);
    
    if (user?.isAnonymous) {
      setTimeout(() => {
        setMaintenanceEnabled(checked);
        setIsUpdating(false);
        toast({
          title: checked ? "Maintenance Protocol Active (Simulated)" : "Maintenance Disabled (Simulated)",
          description: checked 
            ? "Redirecting all non-admin sessions to the restoration hub..." 
            : "Standard platform protocols restored.",
          variant: checked ? "destructive" : "default"
        });
        
        if (checked) {
          setTimeout(() => router.push("/maintenance"), 1500);
        }
      }, 800);
      return;
    }

    try {
      await setDoc(doc(db, "systemSettings", "maintenance_mode"), {
        enabled: checked,
        updatedAt: new Date().toISOString(),
        key: "maintenance_mode",
        scope: "Global"
      }, { merge: true });
      
      setMaintenanceEnabled(checked);
      toast({
        title: checked ? "Maintenance Enabled" : "Maintenance Disabled",
        description: checked 
          ? "Platform is now visible as 'Under Construction' to all non-admins." 
          : "Standard platform protocols restored.",
        variant: checked ? "destructive" : "default"
      });
    } catch (e) {
      toast({
        title: "Update Failed",
        description: "Standard security rules blocked the update. Are you signed in as a verified root admin?",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
          <p className="text-muted-foreground font-medium text-lg">Platform orchestration and ecosystem governance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-primary/20 h-12 px-6 font-bold">
            <Lock className="size-4 mr-2" /> Security Audit
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl h-12 px-8 shadow-xl shadow-primary/20 font-bold text-white">
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

      <Tabs defaultValue="governance" className="space-y-10">
        <TabsList className="bg-muted/50 p-1.5 rounded-2xl h-14 border border-primary/5">
          <TabsTrigger value="governance" className="rounded-xl px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Governance</TabsTrigger>
          <TabsTrigger value="ecosystem" className="rounded-xl px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Ecosystem CRUD</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">User Directory</TabsTrigger>
        </TabsList>

        <TabsContent value="governance" className="space-y-10 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <Card className={`border-none shadow-sm rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 ${maintenanceEnabled ? 'bg-destructive/5 ring-2 ring-destructive/20' : 'bg-white'}`}>
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center shrink-0 transition-colors ${maintenanceEnabled ? 'bg-destructive/10' : 'bg-orange-500/10'}`}>
                    {maintenanceEnabled ? <AlertTriangle className="size-10 text-destructive animate-pulse" /> : <Construction className="size-10 text-orange-500" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-headline font-bold">Global Maintenance Mode</h4>
                      {maintenanceEnabled && <Badge variant="destructive" className="animate-pulse">ACTIVE</Badge>}
                    </div>
                    <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
                      Restrict all user traffic to the interactive neural benchmarks during platform scaling.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 bg-muted/30 p-6 rounded-3xl min-w-[200px]">
                  <Label htmlFor="maint-switch" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Status Control</Label>
                  <Switch 
                    id="maint-switch"
                    checked={maintenanceEnabled}
                    onCheckedChange={toggleMaintenance}
                    disabled={isUpdating}
                    className="data-[state=checked]:bg-destructive"
                  />
                  <span className={`text-[10px] font-bold uppercase ${maintenanceEnabled ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {isUpdating ? 'Syncing...' : maintenanceEnabled ? 'Maintenance ON' : 'Production LIVE'}
                  </span>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                      <Users className="size-6 text-blue-500" />
                    </div>
                    <h5 className="font-headline font-bold text-xl">User Orchestration</h5>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Manage verified nodes and institutional identity protocols.</p>
                  <Button variant="secondary" className="w-full rounded-xl h-12 font-bold">Manage Roles</Button>
                </Card>
                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-2xl">
                      <Globe className="size-6 text-green-500" />
                    </div>
                    <h5 className="font-headline font-bold text-xl">Compliance Logs</h5>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Audit the ecosystem's adherence to global educational standards.</p>
                  <Button variant="secondary" className="w-full rounded-xl h-12 font-bold">Review Logs</Button>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div className="bg-primary text-primary-foreground rounded-[2.5rem] border-none p-10 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <div className="space-y-2 relative z-10">
                  <h4 className="text-xl font-headline font-bold">Admin Privileges</h4>
                  <p className="text-sm opacity-70 font-medium">Unrestricted access to the core platform neural layer. Use with high discretion.</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                   <span>Session Identity</span>
                   <span>ROOT-AUTH</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ecosystem" className="space-y-10 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between px-2">
                <div className="space-y-1">
                  <h3 className="text-3xl font-headline font-bold">Ecosystem Management</h3>
                  <p className="text-muted-foreground font-medium">Full CRUD operations for Job Opportunities and Institution Events.</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-accent hover:bg-accent/90 rounded-xl h-12 px-6 font-bold shadow-lg shadow-accent/10">
                    <Plus className="size-4 mr-2" /> Create New Asset
                  </Button>
                </div>
              </div>

              <div className="space-y-10">
                {/* Jobs Management Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <Briefcase className="size-5 text-primary" />
                    <h4 className="text-lg font-headline font-bold uppercase tracking-widest text-primary">Job Opportunities</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {jobs.map(job => (
                      <Card key={job.id} className="border-none shadow-sm bg-white rounded-3xl p-6 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="size-12 rounded-2xl bg-muted flex items-center justify-center">
                              <Briefcase className="size-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-base font-bold group-hover:text-primary transition-colors">{job.title}</p>
                              <p className="text-xs font-medium text-muted-foreground">{job.company} • {job.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5">
                              <Edit3 className="size-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/5 text-destructive">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Events Management Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <Calendar className="size-5 text-accent" />
                    <h4 className="text-lg font-headline font-bold uppercase tracking-widest text-accent">Institutional Events</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {events.map(event => (
                      <Card key={event.id} className="border-none shadow-sm bg-white rounded-3xl p-6 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="size-12 rounded-2xl bg-muted flex items-center justify-center">
                              <Calendar className="size-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-base font-bold group-hover:text-accent transition-colors">{event.title}</p>
                              <p className="text-xs font-medium text-muted-foreground">{event.date} • {event.loc}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/5">
                              <Edit3 className="size-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/5 text-destructive">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card className="border-none shadow-sm bg-secondary/30 rounded-[2.5rem] p-8 space-y-6">
                <div className="space-y-2">
                  <Sparkles className="size-8 text-accent" />
                  <h4 className="text-xl font-headline font-bold">Asset Analysis</h4>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    The intelligence layer suggests adding more "STEM-focused" events to increase engagement in the Engineering cohort.
                  </p>
                </div>
                <Button className="w-full rounded-xl h-12 font-bold shadow-sm">Review Recommendations</Button>
              </Card>

              <div className="space-y-6 px-2">
                <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-[0.2em]">Platform Metrics</h4>
                <div className="bg-white rounded-3xl border p-6 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground">Live Hubs</span>
                    <span className="text-sm font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground">Ecosystem Artifacts</span>
                    <span className="text-sm font-bold">1,402</span>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                      Full Asset Export <CloudUpload className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
