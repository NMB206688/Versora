
"use client";

import { useState, use } from "react";
import { 
  Plus, 
  Settings, 
  Eye, 
  CloudUpload, 
  Sparkles,
  ChevronDown,
  Video,
  FileText,
  MessageSquare,
  HelpCircle,
  MoreVertical,
  LayoutGrid,
  Zap,
  Layout,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseContentStudio({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() to unwrap the params promise for Next.js 15 compatibility
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("studio");

  const modules = [
    {
      id: "mod1",
      title: "Module 1: Foundations of Thinking",
      items: [
        { type: "video", title: "Welcome & Course Overview", duration: "12m", status: "published" },
        { type: "doc", title: "Syllabus and Reading List", duration: "5 pages", status: "published" },
        { type: "quiz", title: "Diagnostic Assessment", duration: "10 items", status: "draft" },
      ]
    },
    {
      id: "mod2",
      title: "Module 2: The Quantum Leap",
      items: [
        { type: "video", title: "Understanding Entanglement", duration: "45m", status: "published" },
        { type: "discussion", title: "Weekly Seminar: Ethics of QM", duration: "ongoing", status: "published" },
        { type: "assignment", title: "Problem Set #1", duration: "due Friday", status: "published" },
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="size-4 text-blue-500" />;
      case "doc": return <FileText className="size-4 text-orange-500" />;
      case "discussion": return <MessageSquare className="size-4 text-green-500" />;
      case "quiz": return <HelpCircle className="size-4 text-purple-500" />;
      case "assignment": return <Zap className="size-4 text-accent" />;
      default: return <FileText className="size-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Course Header Toolbar */}
      <div className="h-24 border-b flex items-center justify-between px-10 shrink-0 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold text-primary tracking-tight">{resolvedParams.id.toUpperCase()}: Content Studio</h2>
            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><Layout className="size-3" /> Section A</span>
              <span className="text-primary/20 opacity-50">•</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> Fall 2024</span>
            </div>
          </div>
          <div className="flex bg-muted/50 p-1.5 rounded-[1rem] border border-muted-foreground/10">
             <Button variant={activeTab === "studio" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("studio")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6 data-[state=active]:shadow-sm">Studio</Button>
             <Button variant={activeTab === "grades" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("grades")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6">Gradebook</Button>
             <Button variant={activeTab === "people" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("people")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6">People</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="font-bold text-muted-foreground hover:bg-muted/50"><Settings className="size-4 mr-2" /> Course Settings</Button>
          <Button variant="outline" size="sm" className="font-bold border-primary/10 rounded-xl h-11 px-6"><Eye className="size-4 mr-2" /> Preview</Button>
          <Button className="bg-primary hover:bg-primary/90 font-bold rounded-xl h-11 px-8 shadow-lg shadow-primary/20"><CloudUpload className="size-4 mr-2" /> Publish Course</Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-72 border-r bg-muted/5 p-6 space-y-6 hidden lg:block overflow-y-auto">
           <Button className="w-full bg-accent hover:bg-accent/90 shadow-xl shadow-accent/10 h-14 rounded-2xl font-bold">
             <Plus className="size-5 mr-2" /> Add Module
           </Button>
           <div className="space-y-4">
             <div className="px-3 text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Hierarchy Navigation</div>
             <div className="space-y-1">
              {modules.map(m => (
                <button key={m.id} className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-primary/5 transition-all font-bold text-muted-foreground hover:text-primary flex items-center justify-between group">
                  <span className="truncate">{m.title}</span>
                  <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
             </div>
           </div>
           
           <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">AI Content Hub</span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">Generating course content is 80% faster with our intelligence layer.</p>
              <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold border-primary/20 rounded-lg">Open Generator</Button>
           </div>
        </div>

        {/* Main Content Studio Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-muted/10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <h3 className="text-3xl font-headline font-bold tracking-tight">Curriculum Studio</h3>
                <p className="text-muted-foreground font-medium">Design and sequence your learning modules with drag-and-drop ease.</p>
              </div>
              <Button className="rounded-full h-12 px-8 border-accent text-accent hover:bg-accent hover:text-white transition-all bg-white border-2 font-bold shadow-sm">
                <Sparkles className="size-4 mr-2" /> AI Curriculum Architect
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={["mod1"]} className="space-y-6">
              {modules.map((mod) => (
                <AccordionItem key={mod.id} value={mod.id} className="border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] bg-white rounded-[2rem] overflow-hidden px-6 transition-all border border-transparent hover:border-primary/10">
                  <AccordionTrigger className="hover:no-underline py-8">
                    <div className="flex items-center gap-6 text-left">
                      <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center border shrink-0">
                        <LayoutGrid className="size-6 text-muted-foreground/40" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-headline font-bold text-xl block">{mod.title}</span>
                        <div className="flex gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">{mod.items.length} Elements</span>
                          <span className="text-primary/20">•</span>
                          <span className="flex items-center gap-1.5">~150m Learning</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <div className="space-y-3 ml-20 pr-4">
                      {mod.items.map((item, idx) => (
                        <Card key={idx} className="border-none bg-muted/20 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group rounded-2xl">
                          <CardContent className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <div className="p-3 bg-white rounded-xl shadow-sm border border-muted group-hover:border-primary/20 transition-colors">
                                {getIcon(item.type)}
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-sm group-hover:text-primary transition-colors">{item.title}</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">{item.type} • {item.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <Badge variant={item.status === 'published' ? 'secondary' : 'outline'} className="text-[9px] font-bold uppercase tracking-widest py-0 px-3 h-6 border-primary/10">
                                {item.status}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5">
                                <MoreVertical className="size-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button variant="ghost" className="w-full border-2 border-dashed border-primary/10 h-20 rounded-3xl text-muted-foreground/60 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold">
                        <Plus className="size-5 mr-2" /> Add element to module
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="flex justify-center pt-8">
               <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">End of Curriculum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
