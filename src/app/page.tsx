import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, GraduationCap, Briefcase, Globe, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-12">
      <div className="text-center space-y-4 max-w-2xl">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
          <Zap className="text-primary size-8" />
        </div>
        <h1 className="text-5xl font-headline font-bold text-primary leading-tight tracking-tight">
          Versora AI LMS
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          The intelligent operating system for modern education. Empowering students, 
          faculty, and administrators with AI-native tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-xl transition-all border-primary/10 hover:border-primary/30 group">
          <CardHeader>
            <GraduationCap className="size-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle className="font-headline">Student Experience</CardTitle>
            <CardDescription>Personalized learning journeys and AI tutors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/dashboard/student">Enter as Student</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all border-accent/10 hover:border-accent/30 group">
          <CardHeader>
            <Sparkles className="size-10 text-accent mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle className="font-headline">Instructor Studio</CardTitle>
            <CardDescription>AI-assisted course design and grading feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/dashboard/instructor">Enter as Instructor</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all border-muted-foreground/10 group">
          <CardHeader>
            <Zap className="size-10 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle className="font-headline">Platform Admin</CardTitle>
            <CardDescription>Strategic insights and institutional health metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/admin/health">Enter as Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-8 text-muted-foreground/40 font-headline font-bold uppercase tracking-widest text-xs">
        <div className="flex items-center gap-2"><Globe className="size-4" /> Global Collaboration</div>
        <div className="flex items-center gap-2"><Briefcase className="size-4" /> Career Matching</div>
        <div className="flex items-center gap-2"><Zap className="size-4" /> Real-time Analytics</div>
      </div>
    </div>
  );
}
