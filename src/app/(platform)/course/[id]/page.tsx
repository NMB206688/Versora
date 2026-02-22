
"use client";

import { useState } from "react";
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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseContentStudio({ params }: { params: { id: string } }) {
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
      <div className="h-20 border-b flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <div className="space-y-0.5">
            <h2 className="text-xl font-headline font-bold">CS101: Content Studio</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span>Section A</span>
              <span className="text-primary/30">•</span>
              <span>2024 Semester</span>
            </div>
          </div>
          <div className="flex bg-muted/30 p-1 rounded-xl">
             <Button variant={activeTab === "studio" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("studio")} className="rounded-lg h-8 text-xs font-bold">Content Studio</Button>
             <Button variant={activeTab === "grades" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("grades")} className="rounded-lg h-8 text-xs font-bold">Gradebook</Button>
             <Button variant={activeTab === "people" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("people")} className="rounded-lg h-8 text-xs font-bold">People</Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-bold text-muted-foreground"><Settings className="size-4 mr-2" /> Settings</Button>
          <Button variant="outline" size="sm" className="font-bold"><Eye className="size-4 mr-2" /> Preview</Button>
          <Button className="bg-primary hover:bg-primary/90 font-bold"><CloudUpload className="size-4 mr-2" /> Publish</Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-64 border-r bg-muted/10 p-4 space-y-4 hidden lg:block">
           <Button className="w-full bg-accent hover:bg-accent/90 shadow-md">
             <Plus className="size-4 mr-2" /> Add Content
           </Button>
           <div className="space-y-1">
             <div className="px-3 py-2 text-[10px] font-bold uppercase text-muted-foreground">Modules</div>
             {modules.map(m => (
               <button key={m.id} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-primary/5 transition-colors font-medium">
                 {m.title}
               </button>
             ))}
           </div>
        </div>

        {/* Main Content Studio Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-muted/5">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-headline font-bold">Course Modules</h3>
              <Button variant="outline" size="sm" className="rounded-full h-10 px-6 border-primary/20 bg-white">
                <Sparkles className="size-4 mr-2 text-accent" /> Use AI Generator
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={["mod1"]} className="space-y-4">
              {modules.map((mod) => (
                <AccordionItem key={mod.id} value={mod.id} className="border-none shadow-sm bg-white rounded-2xl overflow-hidden px-4">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-left">
                      <LayoutGrid className="size-5 text-muted-foreground/40" />
                      <div>
                        <span className="font-headline font-bold text-lg">{mod.title}</span>
                        <div className="flex gap-4 text-xs text-muted-foreground font-medium mt-1">
                          <span>{mod.items.length} items</span>
                          <span>Est. 2h 30m</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="space-y-2 ml-9">
                      {mod.items.map((item, idx) => (
                        <Card key={idx} className="border-none bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                {getIcon(item.type)}
                              </div>
                              <div>
                                <p className="font-bold text-sm">{item.title}</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground/60">{item.type} • {item.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Badge variant={item.status === 'published' ? 'secondary' : 'outline'} className="text-[10px] font-bold uppercase py-0 px-2 h-5">
                                {item.status}
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="size-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button variant="ghost" className="w-full border-2 border-dashed border-primary/10 h-14 rounded-2xl text-muted-foreground hover:bg-primary/5">
                        <Plus className="size-4 mr-2" /> Add item to module
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
