"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  UserCircle, 
  Bell, 
  ShieldCheck, 
  Eye, 
  Globe, 
  Zap,
  ChevronRight,
  Database,
  CloudUpload
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 bg-muted/5 min-h-full">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-primary/10">
          <Settings className="size-4" /> Profile Orchestration
        </div>
        <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Ecosystem Settings</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
          Configure your personal workspace and define how the intelligence layer interacts with your learning artifacts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-4">
          {[
            { name: "Personal Identity", icon: UserCircle, active: true },
            { name: "Intelligence Feed", icon: Zap, active: false },
            { name: "Compliance & Security", icon: ShieldCheck, active: false },
            { name: "Appearance Nodes", icon: Eye, active: false },
            { name: "Localization", icon: Globe, active: false },
            { name: "Data Protocols", icon: Database, active: false },
          ].map((item) => (
            <button 
              key={item.name} 
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${item.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white hover:bg-primary/5 text-muted-foreground hover:text-primary border shadow-sm'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className={`size-4 opacity-40 ${item.active ? 'opacity-100' : ''}`} />
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-8">
          <Card className="border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] p-10 space-y-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-headline font-bold">Intelligence Preferences</h3>
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-1 flex-1">
                    <Label className="text-base font-bold">Proactive AI Interventions</Label>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Allow the system to suggest study sessions when performance velocity drops.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-1 flex-1">
                    <Label className="text-base font-bold">Neural Feedback Analysis</Label>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Enable advanced linguistic analysis on instructor feedback for deep insights.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-1 flex-1">
                    <Label className="text-base font-bold">Public Skills Indexing</Label>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Allow your skills map to be visible to verified institutional recruiters.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t space-y-6">
              <h3 className="text-2xl font-headline font-bold">System Identity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Institutional Alias</Label>
                  <div className="p-4 bg-muted/30 rounded-2xl border font-bold text-sm">Alex Johnson</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Verified Node</Label>
                  <div className="p-4 bg-muted/30 rounded-2xl border font-bold text-sm">verified@nexus-edu.org</div>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl font-bold h-12 border-primary/10">Update Global Identity</Button>
            </div>
          </Card>

          <Card className="bg-destructive/5 border-2 border-dashed border-destructive/20 rounded-[2.5rem] p-10 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xl font-headline font-bold text-destructive">Termination Protocol</h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Permanently delete your academic identity and all neural artifacts. This action is catastrophic and cannot be reversed.
              </p>
            </div>
            <Button variant="destructive" className="rounded-xl h-12 px-8 font-bold">Purge Identity</Button>
          </Card>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-4 opacity-30 grayscale cursor-default">
           <Zap className="size-5 text-primary" />
           <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Node Configuration: 2.5-ALPHA</span>
        </div>
      </div>
    </div>
  );
}
