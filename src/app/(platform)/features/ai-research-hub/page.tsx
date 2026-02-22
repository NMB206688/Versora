"use client";

import { useState } from "react";
import { aiResearchAndCitationGenerator, type AiResearchAndCitationGeneratorOutput } from "@/ai/flows/ai-research-and-citation-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Book, Copy, ExternalLink, Sparkles, Database, BookmarkPlus, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function AiResearchHub() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AiResearchAndCitationGeneratorOutput | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const res = await aiResearchAndCitationGenerator({ query });
      setResults(res);
    } catch (err) {
      toast({
        title: "Search failed",
        description: "There was an error connecting to the research intelligence layer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Citation Copied",
      description: "APA 7th edition citation ready for your bibliography.",
    });
  };

  return (
    <div className="min-h-full bg-muted/5">
      <div className="p-8 max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-6 text-center lg:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-headline font-bold uppercase tracking-[0.2em] text-xs px-4 py-2 rounded-full border border-primary/10">
            <Database className="size-4" /> Research Intelligence Layer
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Intelligent Discovery Hub</h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Query millions of academic sources using natural language. Get instant source verification and perfectly formatted APA citations.
          </p>
        </div>

        {/* Search Bar Area */}
        <div className="relative group max-w-4xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2.5rem] blur-xl opacity-25 group-focus-within:opacity-50 transition-opacity" />
          <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-4 p-4 bg-white rounded-[2.5rem] shadow-2xl border border-primary/5">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-5 h-6 w-6 text-muted-foreground/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your research topic in plain English..."
                className="h-16 pl-14 pr-4 text-xl rounded-2xl border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/30 font-medium"
              />
            </div>
            <Button 
              disabled={loading || !query} 
              type="submit" 
              className="h-16 rounded-[1.5rem] px-12 bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="size-6 animate-spin" /> : (
                <span className="flex items-center gap-2">
                  <Sparkles className="size-5" /> Start Research
                </span>
              )}
            </Button>
          </form>
        </div>

        {results ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between px-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-headline font-bold">Suggested Academic Sources</h3>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <GraduationCap className="size-4 text-primary" /> Verified through Versora Academic Index
                </p>
              </div>
              <Badge variant="outline" className="rounded-xl px-4 py-2 border-primary/10 bg-white font-bold text-primary">
                {results.sources.length} Peer Reviewed Results
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {results.sources.map((source, idx) => (
                <Card key={idx} className="group hover:shadow-2xl hover:border-primary/20 transition-all duration-500 shadow-sm border-none bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="p-10 flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">{source.year}</Badge>
                           <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{source.publication}</span>
                        </div>
                        <CardTitle className="text-2xl font-headline leading-tight font-bold group-hover:text-primary transition-colors">
                          {source.title}
                        </CardTitle>
                        <p className="text-muted-foreground font-medium">{source.authors.join(", ")}</p>
                      </div>

                      <div className="p-6 bg-muted/20 rounded-[1.5rem] text-[13px] font-mono leading-relaxed text-muted-foreground/80 border border-transparent group-hover:border-primary/10 group-hover:bg-primary/5 transition-all relative">
                        <div className="pr-12">
                          {source.citation}
                        </div>
                        <Button 
                          onClick={() => copyCitation(source.citation)}
                          variant="secondary" 
                          size="icon" 
                          className="absolute right-4 top-4 h-10 w-10 rounded-xl shadow-sm hover:scale-105 transition-all"
                          title="Copy Citation"
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-col gap-3 justify-center">
                      <Button className="w-full h-12 rounded-xl font-bold gap-2">
                        <Book className="size-4" /> Full Text
                      </Button>
                      <Button variant="outline" className="w-full h-12 rounded-xl font-bold gap-2 border-primary/10">
                        <BookmarkPlus className="size-4" /> Save Source
                      </Button>
                      <Button variant="ghost" className="w-full h-12 rounded-xl font-bold gap-2 text-muted-foreground hover:text-primary">
                        <ExternalLink className="size-4" /> Repository
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : !loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center px-4">
            <div className="size-32 bg-primary/5 rounded-[3rem] flex items-center justify-center animate-pulse">
              <Book className="size-16 text-primary/20" />
            </div>
            <div className="space-y-2">
              <p className="font-headline font-bold text-2xl text-muted-foreground/50">Your bibliography starts here</p>
              <p className="text-muted-foreground/40 font-medium max-w-md">Search for journals, papers, or specific topics to begin your intelligent discovery.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
