
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  AlertCircle, 
  ArrowUpRight, 
  Plus,
  MessageCircle,
  BarChart3,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function InstructorDashboard() {
  const courses = [
    { id: "cs101", title: "CS101: Computer Science Fundamentals", students: 124, pending: 12, health: "on track" },
    { id: "eco202", title: "ECO202: Advanced Macroeconomics", students: 45, pending: 3, health: "attention" },
    { id: "hist105", title: "HIST105: The Roman Empire", students: 68, pending: 0, health: "on track" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Instructor Command Center</h2>
          <p className="text-muted-foreground">Managing your courses and tracking student success in real-time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <BarChart3 className="size-4 mr-2" /> Global Insights
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="size-4 mr-2" /> New Course
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Total Students</CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
            <p className="text-[10px] text-muted-foreground mt-1">+12 this semester</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Avg. Completion</CardTitle>
            <GraduationCap className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-[10px] text-green-500 font-bold mt-1">↑ 4% from avg.</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white border-l-4 border-accent">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-accent">Needs Attention</CardTitle>
            <AlertCircle className="size-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-[10px] text-muted-foreground mt-1">Students flagging at-risk</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase opacity-70">Grading Queue</CardTitle>
            <Plus className="size-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-[10px] opacity-70 mt-1">Submissions pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold">Active Courses</h3>
            <Button variant="ghost" size="sm" className="text-primary">View Archive</Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-headline font-bold">{course.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="size-3" /> {course.students} Students</span>
                      <span className="flex items-center gap-1 font-bold text-accent"><AlertCircle className="size-3" /> {course.pending} Pending</span>
                      <Badge variant={course.health === "attention" ? "destructive" : "secondary"}>
                        {course.health.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                    <Link href={`/course/${course.id}`}>
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-headline font-bold flex items-center gap-2">
            <Sparkles className="size-5 text-accent" /> AI Insights
          </h3>
          <Card className="bg-secondary/30 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-headline">Predictive Alert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-xl space-y-3 shadow-sm border-l-4 border-accent">
                <p className="text-sm font-medium leading-tight">
                  Student engagement in <span className="font-bold">ECO202</span> has dropped by 18% this week.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 text-[10px] rounded-lg">Draft Announcement</Button>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-lg">View Details</Button>
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl space-y-3 shadow-sm">
                <p className="text-sm font-medium leading-tight">
                  Assignment rubric for <span className="font-bold">Quantum Intro</span> could be more balanced.
                </p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary">
                  Let AI optimize rubric
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
             <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-widest">Recent Activity</h4>
             {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">New discussion post in CS101</p>
                    <p className="text-xs text-muted-foreground">"Question regarding the Big O analysis..."</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
