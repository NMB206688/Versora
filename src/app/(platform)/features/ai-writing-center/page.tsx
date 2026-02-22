
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
  Quote
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Main Editor */}
      <div className="flex-1 p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <PenTool className="size-6 text-primary" /> Content Studio
            </h2>
            <p className="text-sm text-muted-foreground">Draft your masterpiece with real-time AI guidance.</p>
          </div>
          <Button 
            onClick={handleGetFeedback} 
            disabled={loading || !content}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
          >
            {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Sparkles className="size-4 mr-2" />}
            Analyze Draft
          </Button>
        </div>

        <div className="flex-1 bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b flex gap-2 overflow-x-auto bg-muted/20">
             <Button variant="ghost" size="sm" className="font-bold">B</Button>
             <Button variant="ghost" size="sm" className="italic font-serif">I</Button>
             <Button variant="ghost" size="sm" className="underline underline-offset-4">U</Button>
             <div className="w-px h-6 bg-border mx-2" />
             <Button variant="ghost" size="sm">H1</Button>
             <Button variant="ghost" size="sm">H2</Button>
             <Button variant="ghost" size="sm">List</Button>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your essay here... (Pro tip: Be specific and cite your sources!)"
            className="flex-1 p-8 text-lg leading-relaxed border-none resize-none focus-visible:ring-0 placeholder:text-muted-foreground/30 font-serif"
          />
        </div>
      </div>

      {/* Side Feedback Panel */}
      <div className="w-[400px] border-l bg-muted/30 flex flex-col">
        <div className="p-6 border-b bg-white">
          <h3 className="font-headline font-bold text-lg flex items-center gap-2">
            <Zap className="text-accent size-5" /> AI Feedback Coach
          </h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {!feedback ? (
              <div className="text-center py-20 space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                  <Sparkles className="text-primary size-8" />
                </div>
                <div className="space-y-2">
                  <p className="font-headline font-bold">Ready to analyze</p>
                  <p className="text-sm text-muted-foreground px-4">
                    Write at least 50 words to receive detailed feedback on your argumentation, structure, and citations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <Card className="border-none shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-headline flex items-center gap-2">
                      <MessageSquare className="size-4 text-primary" /> Overall Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm leading-relaxed">
                    {feedback.overallFeedback}
                  </CardContent>
                </Card>

                <Tabs defaultValue="structure" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 h-10 bg-white border">
                    <TabsTrigger value="structure" className="text-xs">
                      <Layout className="size-3 mr-1" /> Layout
                    </TabsTrigger>
                    <TabsTrigger value="citations" className="text-xs">
                      <Quote className="size-3 mr-1" /> Cite
                    </TabsTrigger>
                    <TabsTrigger value="grammar" className="text-xs">
                      <CheckCircle className="size-3 mr-1" /> Edits
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="structure" className="mt-4">
                    <div className="text-sm space-y-2">
                       <p className="font-bold text-xs uppercase text-muted-foreground">Structural Suggestions</p>
                       <p className="leading-relaxed">{feedback.structuralFeedback}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="citations" className="mt-4">
                    <div className="text-sm space-y-2">
                       <p className="font-bold text-xs uppercase text-muted-foreground">Citations & References</p>
                       <p className="leading-relaxed">{feedback.citationSuggestions}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="grammar" className="mt-4">
                    <div className="text-sm space-y-2">
                       <p className="font-bold text-xs uppercase text-muted-foreground">Corrections</p>
                       <p className="leading-relaxed">{feedback.grammarAndSpellingCorrections}</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Card className="bg-primary text-primary-foreground border-none shadow-md">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-headline">Actionable Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-xs leading-relaxed opacity-90">
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
