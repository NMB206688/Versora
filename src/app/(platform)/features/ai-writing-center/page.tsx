"use client";

import { useState } from "react";
import { aiWritingCenterAssistant, type AiWritingCenterAssistantOutput } from "@/ai/flows/ai-writing-center-assistant";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  Sparkles, 
  Loader2, 
  MessageSquare, 
  Layout, 
  CheckCircle, 
  Zap, 
  Quote,
  Clock,
  Type,
  Maximize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function AiWritingCenter() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<AiWritingCenterAssistantOutput | null>(null);
  const { toast } = useToast();

  const handleGetFeedback = async () => {
    if (!content || content.length < 50) {
      toast({
        title: "Content too short",
        description: "Please provide a bit more text for a meaningful analysis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await aiWritingCenterAssistant({ 
        essayContent: content,
        citationStyle: "APA 7th Edition"
      });
      setFeedback(res);
    } catch (err) {
      toast({
        title: "Analysis failed",
        description: "The writing assistant is currently unavailable.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-muted/5">
      {/* Main Editor Section */}
      <div className="flex-1 flex flex-col border-r bg-white relative">
        <header className="h-16 border-b px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PenTool className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg leading-tight tracking-tight">Manuscript Editor</h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Project: Semester Final Essay</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground mr-4">
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Saved 2m ago</span>
                <span className="flex items-center gap-1.5"><Type className="size-3" /> {wordCount} words</span>
             </div>
             <Button 
               onClick={handleGetFeedback} 
               disabled={loading || !content}
               className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-10 shadow-lg shadow-primary/20 transition-all font-bold"
             >
               {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Sparkles className="size-4 mr-2" />}
               Analyze with AI
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your story begins here. Start typing..."
            className="h-full w-full p-12 text-xl leading-[1.8] border-none resize-none focus-visible:ring-0 placeholder:text-muted-foreground/20 font-serif bg-transparent selection:bg-primary/10"
          />
          
          <div className="absolute bottom-8 right-8 flex gap-2">
             <Button variant="secondary" size="icon" className="rounded-full shadow-md h-12 w-12"><Maximize2 className="size-5" /></Button>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Sidebar */}
      <div className="w-[450px] bg-muted/10 flex flex-col shadow-inner">
        <header className="p-6 border-b bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl flex items-center gap-3">
              <Zap className="text-accent size-6 animate-pulse" /> Feedback Intelligence
            </h3>
            <Badge variant="outline" className="bg-white border-primary/10 font-bold uppercase text-[9px] tracking-tighter">Gemini Pro 2.5</Badge>
          </div>
        </header>
        
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8 pb-12">
            {!feedback ? (
              <div className="text-center py-32 space-y-6">
                <div className="inline-flex items-center justify-center p-6 bg-white rounded-[2rem] shadow-sm border">
                  <Sparkles className="text-primary size-10" />
                </div>
                <div className="space-y-2 px-8">
                  <p className="font-headline font-bold text-xl">Ready for Analysis</p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Provide your manuscript text to receive detailed insights on structure, tone, and citation accuracy.
                  </p>
                </div>
                {content.length < 50 && content.length > 0 && (
                   <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Need {50 - content.length} more characters</p>
                )}
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <Card className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] bg-white rounded-[2rem]">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-base font-headline font-bold flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-xl"><MessageSquare className="size-4 text-primary" /></div> 
                      Strategic Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 text-sm leading-relaxed font-medium text-muted-foreground">
                    {feedback.overallFeedback}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Tabs defaultValue="structure" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 h-14 bg-white/50 p-1.5 rounded-2xl border">
                      <TabsTrigger value="structure" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[11px] uppercase tracking-wider">
                        Structure
                      </TabsTrigger>
                      <TabsTrigger value="citations" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[11px] uppercase tracking-wider">
                        Citations
                      </TabsTrigger>
                      <TabsTrigger value="grammar" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-[11px] uppercase tracking-wider">
                        Mechanics
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6">
                      <TabsContent value="structure" className="animate-in fade-in duration-300">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                             <Layout className="size-4 text-primary" />
                             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Flow & Organization</span>
                           </div>
                           <p className="text-sm leading-relaxed font-medium">{feedback.structuralFeedback}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="citations" className="animate-in fade-in duration-300">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                             <Quote className="size-4 text-primary" />
                             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Source Integrity</span>
                           </div>
                           <p className="text-sm leading-relaxed font-medium">{feedback.citationSuggestions}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="grammar" className="animate-in fade-in duration-300">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                             <CheckCircle className="size-4 text-primary" />
                             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language Quality</span>
                           </div>
                           <p className="text-sm leading-relaxed font-medium">{feedback.grammarAndSpellingCorrections}</p>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <Card className="bg-primary text-primary-foreground border-none shadow-xl rounded-[2rem] overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-base font-headline font-bold flex items-center gap-3">
                      <Zap className="size-5 text-accent" /> Actionable Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 text-xs leading-relaxed opacity-90 font-medium">
                    <div className="whitespace-pre-wrap">{feedback.actionableSteps}</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
