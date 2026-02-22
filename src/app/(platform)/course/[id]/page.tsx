
"use client";

import { useState, use, useEffect } from "react";
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
  ArrowUpRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
  PlayCircle,
  Download,
  Share2,
  Trash2,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useUser, useFirestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function CourseContentStudio({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const db = useFirestore();
  
  const [role, setRole] = useState<string>("student");
  const [activeTab, setActiveTab] = useState("studio");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Fetch role for UI permissions
  useEffect(() => {
    async function fetchRole() {
      if (user && !user.isAnonymous) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role?.toLowerCase() || "student");
        }
      } else if (user?.isAnonymous) {
        setRole("student"); // Guests see student view
      }
    }
    fetchRole();
  }, [user, db]);

  const [modules, setModules] = useState([
    {
      id: "mod1",
      title: "Module 1: Foundations of Thinking",
      description: "Establishing the core philosophical frameworks for the term.",
      items: [
        { id: "i1", type: "video", title: "Welcome & Course Overview", duration: "12m", status: "published", content: "This video introduces the core objectives of the course and sets expectations for the semester." },
        { id: "i2", type: "doc", title: "Syllabus and Reading List", duration: "5 pages", status: "published", content: "The comprehensive guide to all required texts and weekly schedules." },
        { id: "i3", type: "quiz", title: "Diagnostic Assessment", duration: "10 items", status: "draft", content: "A non-graded quiz to help the instructor understand your starting level." },
      ]
    },
    {
      id: "mod2",
      title: "Module 2: The Quantum Leap",
      description: "Moving beyond classical physics into the realm of uncertainty.",
      items: [
        { id: "i4", type: "video", title: "Understanding Entanglement", duration: "45m", status: "published", content: "A deep dive into one of quantum mechanics' most counterintuitive concepts." },
        { id: "i5", type: "discussion", title: "Weekly Seminar: Ethics of QM", duration: "ongoing", status: "published", content: "A collaborative space to discuss the societal impacts of quantum technology." },
        { id: "i6", type: "assignment", title: "Problem Set #1", duration: "due Friday", status: "published", content: "Apply Schrödinger's equation to three distinct one-dimensional potential wells." },
      ]
    }
  ]);

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

  const handleLaunchItem = (item: any) => {
    setSelectedItem(item);
    setIsViewerOpen(true);
  };

  const handleAddModule = () => {
    toast({
      title: "Module Created",
      description: "New module placeholder added to the bottom of the curriculum.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Success",
      description: "Course updates have been published to the student portal.",
    });
  };

  if (isViewerOpen && selectedItem) {
    return (
      <div className="h-full flex flex-col bg-white animate-in fade-in duration-500">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsViewerOpen(false)} className="rounded-full h-10 w-10">
              <ChevronLeft className="size-5" />
            </Button>
            <div className="h-8 w-px bg-muted mx-2" />
            <div>
              <h3 className="font-headline font-bold text-lg leading-tight">{selectedItem.title}</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{selectedItem.type} • {selectedItem.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl h-9 font-bold border-primary/10">
              <Share2 className="size-4 mr-2" /> Share
            </Button>
            <Button className="rounded-xl h-9 font-bold bg-primary shadow-lg shadow-primary/10">
              Mark as Complete <CheckCircle2 className="size-4 ml-2" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-muted/5">
          <div className="max-w-5xl mx-auto p-12 space-y-12">
            <div className="aspect-video bg-black rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {selectedItem.type === 'video' ? (
                <PlayCircle className="size-20 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
              ) : (
                <div className="text-center space-y-4">
                  <FileText className="size-20 text-white/20 mx-auto" />
                  <p className="text-white/40 font-headline font-bold text-xl uppercase tracking-widest">Document Preview Mode</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-3xl font-headline font-bold">Content Narrative</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {selectedItem.content}
                  </p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] border shadow-sm space-y-6">
                  <h5 className="font-bold flex items-center gap-2">
                    <Download className="size-4 text-primary" /> Attached Resources
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Technical Reference PDF', 'Slide Deck (v2)'].map((r, i) => (
                      <div key={i} className="p-4 rounded-xl border-2 border-dashed border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-between group">
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">{r}</span>
                        <Download className="size-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <Card className="border-none shadow-sm bg-primary text-primary-foreground rounded-[2rem] p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                  <div className="relative z-10 space-y-4">
                    <Sparkles className="size-10 text-accent" />
                    <h4 className="text-xl font-headline font-bold leading-tight">AI Note Engine</h4>
                    <p className="text-xs opacity-70 leading-relaxed font-medium">
                      Our intelligence layer is summarizing this session. Check back in 5 minutes for a dynamic study guide.
                    </p>
                    <Button variant="secondary" className="w-full h-11 rounded-xl font-bold text-xs">Request Instant Summary</Button>
                  </div>
                </Card>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">Up Next in Module</h5>
                  <div className="space-y-3">
                    {modules[0].items.filter(i => i.id !== selectedItem.id).map(i => (
                      <div key={i.id} onClick={() => handleLaunchItem(i)} className="p-4 bg-white rounded-2xl border shadow-sm hover:border-primary/20 transition-all cursor-pointer flex items-center gap-4 group">
                        <div className="p-2.5 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                          {getIcon(i.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{i.title}</p>
                          <p className="text-[9px] uppercase font-bold text-muted-foreground/60">{i.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Course Header Toolbar */}
      <div className="h-24 border-b flex items-center justify-between px-10 shrink-0 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold text-primary tracking-tight">
              {resolvedParams.id.toUpperCase()}: {role === 'instructor' ? 'Content Studio' : 'Learning Pathway'}
            </h2>
            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><Layout className="size-3" /> Section A</span>
              <span className="text-primary/20 opacity-50">•</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> Fall 2024</span>
            </div>
          </div>
          {role === 'instructor' && (
            <div className="flex bg-muted/50 p-1.5 rounded-[1rem] border border-muted-foreground/10">
               <Button variant={activeTab === "studio" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("studio")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6 data-[state=active]:shadow-sm">Studio</Button>
               <Button variant={activeTab === "grades" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("grades")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6">Gradebook</Button>
               <Button variant={activeTab === "people" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("people")} className="rounded-[0.75rem] h-9 text-xs font-bold px-6">People</Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="font-bold text-muted-foreground hover:bg-muted/50 hidden md:flex"><Settings className="size-4 mr-2" /> Settings</Button>
          <Button variant="outline" size="sm" className="font-bold border-primary/10 rounded-xl h-11 px-6"><Eye className="size-4 mr-2" /> Preview</Button>
          {role === 'instructor' && (
            <Button onClick={handlePublish} className="bg-primary hover:bg-primary/90 font-bold rounded-xl h-11 px-8 shadow-lg shadow-primary/20">
              <CloudUpload className="size-4 mr-2" /> Publish Course
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-72 border-r bg-muted/5 p-6 space-y-6 hidden lg:block overflow-y-auto">
           {role === 'instructor' ? (
             <Dialog>
               <DialogTrigger asChild>
                 <Button className="w-full bg-accent hover:bg-accent/90 shadow-xl shadow-accent/10 h-14 rounded-2xl font-bold">
                   <Plus className="size-5 mr-2" /> Add Module
                 </Button>
               </DialogTrigger>
               <DialogContent className="rounded-[2.5rem] border-none shadow-3xl">
                 <DialogHeader>
                   <DialogTitle className="font-headline text-3xl font-bold">Create Module</DialogTitle>
                   <DialogDescription className="font-medium text-muted-foreground">Define a new organizational block for your curriculum.</DialogDescription>
                 </DialogHeader>
                 <div className="space-y-6 py-6">
                   <div className="space-y-2">
                     <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Module Title</Label>
                     <Input placeholder="e.g., Module 3: Advanced Applications" className="h-12 rounded-2xl bg-muted/40 border-none" />
                   </div>
                   <div className="space-y-2">
                     <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Contextual Narrative</Label>
                     <Textarea placeholder="Briefly describe the learning goals for this module..." className="rounded-2xl bg-muted/40 border-none min-h-[100px]" />
                   </div>
                 </div>
                 <DialogFooter>
                   <Button onClick={handleAddModule} className="w-full h-14 rounded-2xl font-bold bg-primary shadow-xl shadow-primary/10">Build Module Structure</Button>
                 </DialogFooter>
               </DialogContent>
             </Dialog>
           ) : (
             <div className="p-6 bg-primary text-primary-foreground rounded-[2rem] space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-xl" />
                <div className="relative z-10 space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">Learning Progress</p>
                  <p className="text-3xl font-headline font-bold">42%</p>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[42%] shadow-[0_0_10px_rgba(255,100,150,0.5)]" />
                  </div>
                  <p className="text-[10px] font-medium opacity-70 pt-1">3 modules remaining</p>
                </div>
             </div>
           )}

           <div className="space-y-4 pt-4">
             <div className="px-3 text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Curriculum Hierarchy</div>
             <div className="space-y-1">
              {modules.map(m => (
                <button key={m.id} className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-primary/5 transition-all font-bold text-muted-foreground hover:text-primary flex items-center justify-between group">
                  <span className="truncate">{m.title}</span>
                  <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
             </div>
           </div>
           
           <div className="p-6 bg-accent/5 rounded-[2rem] border border-accent/10 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">AI Intelligence</span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
                {role === 'instructor' 
                  ? 'Generating course content is 80% faster with our intelligence layer.' 
                  : 'Get personalized summaries and study guides for any content item.'}
              </p>
              <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold border-accent/20 rounded-lg text-accent hover:bg-accent hover:text-white transition-all">Launch Architect</Button>
           </div>
        </div>

        {/* Main Content Studio Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-muted/10">
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-4xl font-headline font-bold tracking-tight">
                  {role === 'instructor' ? 'Curriculum Studio' : 'Active Learning Map'}
                </h3>
                <p className="text-muted-foreground font-medium text-lg">
                  {role === 'instructor' 
                    ? 'Design and sequence your learning modules with ease.' 
                    : 'Explore the term structure and resume your learning nodes.'}
                </p>
              </div>
              {role === 'instructor' && (
                <Button className="rounded-full h-12 px-8 border-accent text-accent hover:bg-accent hover:text-white transition-all bg-white border-2 font-bold shadow-sm">
                  <Sparkles className="size-4 mr-2" /> AI Curriculum Architect
                </Button>
              )}
            </div>

            <Accordion type="multiple" defaultValue={["mod1"]} className="space-y-6">
              {modules.map((mod) => (
                <AccordionItem key={mod.id} value={mod.id} className="border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] overflow-hidden px-8 transition-all border border-transparent hover:border-primary/10">
                  <AccordionTrigger className="hover:no-underline py-10">
                    <div className="flex items-center gap-8 text-left">
                      <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center border shrink-0">
                        <LayoutGrid className="size-8 text-muted-foreground/40" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-headline font-bold text-2xl block leading-tight">{mod.title}</span>
                        <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">{mod.items.length} Intelligence Nodes</span>
                          <span className="text-primary/20">•</span>
                          <span className="flex items-center gap-1.5">~150m Learning Velocity</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10">
                    <div className="space-y-4 ml-24 pr-4">
                      {mod.items.map((item, idx) => (
                        <Card key={idx} onClick={() => handleLaunchItem(item)} className="border-none bg-muted/20 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group rounded-2xl">
                          <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="p-3.5 bg-white rounded-xl shadow-sm border border-muted group-hover:border-primary/20 transition-colors">
                                {getIcon(item.type)}
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-base group-hover:text-primary transition-colors leading-tight">{item.title}</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">{item.type} • {item.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              {role === 'instructor' && (
                                <>
                                  <Badge variant={item.status === 'published' ? 'secondary' : 'outline'} className="text-[9px] font-bold uppercase tracking-widest py-0 px-3 h-6 border-primary/10">
                                    {item.status}
                                  </Badge>
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5">
                                    <Edit3 className="size-4 text-muted-foreground" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-destructive/5 text-destructive">
                                    <Trash2 className="size-4" />
                                  </Button>
                                </>
                              )}
                              {role === 'student' && item.status === 'published' && (
                                <Button className="rounded-xl h-10 px-6 font-bold text-xs bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 group-active:scale-95 transition-all">Launch Node</Button>
                              )}
                              {item.status === 'draft' && role === 'student' && (
                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest py-0 px-3 h-6 bg-muted/50 border-none flex items-center gap-1.5">
                                  <Lock className="size-3" /> Locked
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {role === 'instructor' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full border-2 border-dashed border-primary/10 h-24 rounded-3xl text-muted-foreground/60 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold">
                              <Plus className="size-5 mr-2" /> Add node to module sequence
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-[2.5rem] border-none shadow-3xl">
                            <DialogHeader>
                              <DialogTitle className="font-headline text-3xl font-bold">Create Content Node</DialogTitle>
                              <DialogDescription className="font-medium text-muted-foreground">Add a new learning activity or resource to this module.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-6">
                              <div className="space-y-2">
                                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Node Type</Label>
                                <Select defaultValue="video">
                                  <SelectTrigger className="h-12 rounded-2xl bg-muted/40 border-none">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-2xl border-none shadow-xl">
                                    <SelectItem value="video">Intelligence Video</SelectItem>
                                    <SelectItem value="doc">Academic Document</SelectItem>
                                    <SelectItem value="assignment">Graded Assignment</SelectItem>
                                    <SelectItem value="discussion">Peer Discussion</SelectItem>
                                    <SelectItem value="quiz">Formative Quiz</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
                                <Input placeholder="e.g., Session 4: Neural Propagation" className="h-12 rounded-2xl bg-muted/40 border-none" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => toast({ title: "Node Created", description: "Your content node has been added to the draft queue." })} className="w-full h-14 rounded-2xl font-bold bg-primary shadow-xl shadow-primary/10">Integrate into Module</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="flex justify-center pt-8">
               <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">End of Term Curriculum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
