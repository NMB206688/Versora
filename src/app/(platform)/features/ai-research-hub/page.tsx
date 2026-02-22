
"use client";

import { useState } from "react";
import { aiResearchAndCitationGenerator, type AiResearchAndCitationGeneratorOutput } from "@/ai/flows/ai-research-and-citation-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Book, Copy, ExternalLink, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-sm">
          <Sparkles className="size-4" /> AI Research & Citation Hub
        </div>
        <h2 className="text-4xl font-headline font-bold text-primary">Intelligent Discovery</h2>
        <p className="text-lg text-muted-foreground">
          Ask for academic sources in natural language. We'll find relevant materials and generate perfect APA citations.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'recent studies on renewable energy transition in developing nations'"
          className="h-16 pl-14 pr-32 text-lg rounded-2xl shadow-lg border-primary/20 focus-visible:ring-primary/40"
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <Button 
            disabled={loading || !query} 
            type="submit" 
            className="h-full rounded-xl px-8 bg-primary hover:bg-primary/90"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Search Hub"}
          </Button>
        </div>
      </form>

      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold">Suggested Academic Sources</h3>
            <span className="text-sm text-muted-foreground">{results.sources.length} sources found</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {results.sources.map((source, idx) => (
              <Card key={idx} className="hover:border-primary/30 transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-headline leading-tight">{source.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {source.authors.join(", ")} ({source.year}) • {source.publication}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-secondary/30 rounded-lg text-xs font-mono text-muted-foreground border border-primary/10 relative group/citation">
                    {source.citation}
                    <Button 
                      onClick={() => copyCitation(source.citation)}
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1 h-8 w-8 opacity-0 group-hover/citation:opacity-100 transition-opacity"
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <Book className="size-3 mr-1" /> Full Text
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                      <ExternalLink className="size-3 mr-1" /> View Repository
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-20">
          <Book className="size-20 mb-4" />
          <p className="font-headline font-bold text-xl">Your bibliography starts here</p>
        </div>
      )}
    </div>
  );
}
