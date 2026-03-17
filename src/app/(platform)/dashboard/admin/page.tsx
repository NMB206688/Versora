
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  AlertTriangle
} from "lucide-react";
import { useFirestore } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const db = useFirestore();
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
        description: "Could not synchronize with the intelligence layer.",
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
          <p className="text-muted-foreground font-medium text-lg">Platform orchestration and high-level ecosystem oversight.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-headline font-bold">Platform Governance</h3>
            <Badge variant="outline" className="border-primary/10 text-primary font-bold uppercase tracking-widest text-[9px] px-3 h-6">Cluster: A-Primary</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Maintenance Mode Controller */}
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
                    Redirect all traffic to the restoration hub. Includes interactive puzzles for user engagement during downtime.
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
                  {isUpdating ? 'Synchronizing...' : maintenanceEnabled ? 'Maintenance ON' : 'Production LIVE'}
                </span>
              </div>
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
