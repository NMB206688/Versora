
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Clock, 
  MessageSquare, 
  FileText, 
  ChevronRight,
  Sparkles,
  Zap,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function StudentDashboard() {
  const hero = PlaceHolderImages.find(img => img.id === "student-dashboard-hero");

  const courses = [
    { title: "Introduction to Quantum Physics", progress: 65, instructor: "Dr. Aris Thorne", color: "bg-blue-500" },
    { title: "Global Economics 101", progress: 42, instructor: "Prof. Sarah Miller", color: "bg-purple-500" },
    { title: "Advanced Data Structures", progress: 88, instructor: "Elena Rodriguez", color: "bg-accent" },
  ];

  const upcoming = [
    { title: "Quantum Entanglement Lab", due: "Today, 11:59 PM", type: "Assignment", urgency: "destructive" },
    { title: "Economics Weekly Reflection", due: "Tomorrow", type: "Discussion", urgency: "default" },
    { title: "Final Project Draft", due: "Oct 24", type: "Paper", urgency: "secondary" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl border bg-primary text-primary-foreground p-8 min-h-[250px] flex flex-col justify-end">
        {hero && (
          <Image 
            src={hero.imageUrl} 
            alt={hero.description}
            fill
            className="object-cover opacity-20 pointer-events-none"
            priority
            data-ai-hint={hero.imageHint}
          />
        )}
        <div className="relative z-10 space-y-4 max-w-2xl">
          <Badge className="bg-accent hover:bg-accent/80 text-white font-headline border-none px-3 py-1">Welcome back, Alex</Badge>
          <h2 className="text-4xl font-headline font-bold leading-tight">Your next leap starts here.</h2>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Play className="size-4 mr-2" /> Continue Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white">
              View Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Courses and Portfolio */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
                <BookOpen className="text-primary size-6" /> My Active Courses
              </h3>
              <Button variant="ghost" className="text-primary font-bold">View all</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.title} className="hover:shadow-lg transition-shadow border-none shadow-md bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight font-headline">{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button variant="secondary" size="sm" className="w-full group">
                      Resume <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-secondary/50 border-dashed border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="text-accent size-5" />
                <CardTitle className="font-headline">Evidence-of-Learning Portfolio</CardTitle>
              </div>
              <CardDescription>
                You have 4 new items ready to be added to your showcase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-shrink-0 w-32 h-20 bg-white rounded-lg border flex items-center justify-center text-primary/30">
                    <FileText className="size-8" />
                  </div>
                ))}
                <button className="flex-shrink-0 w-32 h-20 bg-primary/5 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-primary/60 hover:bg-primary/10 transition-colors">
                  <Zap className="size-4 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Add New</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Deadlines and Feedback */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
              <Clock className="text-primary size-5" /> Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {upcoming.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-transparent hover:border-primary/20 hover:shadow-sm transition-all">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${item.urgency === 'destructive' ? 'bg-destructive animate-pulse' : 'bg-primary/40'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] py-0 h-4">{item.type}</Badge>
                      <span className="text-xs text-muted-foreground">{item.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-primary size-5" /> Recent Feedback
            </h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-white border-none shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Essay: The Industrial Revolution</p>
                        <p className="text-xs text-muted-foreground">Global History 101</p>
                      </div>
                      <Badge className="bg-green-500 text-white border-none">94/100</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 italic">
                      "Excellent use of primary sources. Your argumentation in the third paragraph was particularly strong..."
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary font-bold text-xs">
                      Read more feedback
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
