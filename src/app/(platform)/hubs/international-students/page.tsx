
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Clock, 
  CheckCircle2, 
  Plane, 
  FileText, 
  MessageCircle,
  ShieldCheck,
  Calendar
} from "lucide-react";

export default function InternationalHub() {
  const steps = [
    { title: "Visa Status Check", status: "completed", date: "Oct 12", icon: ShieldCheck },
    { title: "I-20 Form Request", status: "in-progress", date: "In Progress", icon: FileText },
    { title: "Pre-Arrival Orientation", status: "pending", date: "Nov 5", icon: Globe },
    { title: "Airport Pickup Request", status: "pending", date: "TBD", icon: Plane },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="bg-primary rounded-3xl p-10 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Globe className="size-4 text-accent" />
            <span className="text-sm font-bold tracking-tight">Global Scholars Hub</span>
          </div>
          <h2 className="text-5xl font-headline font-bold leading-tight">Your bridge to a world-class education.</h2>
          <p className="text-xl opacity-80 max-w-xl">
            Everything you need to manage your visa, cultural transition, and academic journey in one secure place.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-xl shadow-lg border-none">
              <MessageCircle className="size-4 mr-2" /> Talk to an Advisor
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
               Travel Registration
            </Button>
          </div>
        </div>
        <div className="hidden lg:block relative z-10 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl w-72">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase opacity-60">Visa Health</p>
                <Badge className="bg-green-500 text-white border-none text-[10px]">ACTIVE</Badge>
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold">F-1 Student Visa</p>
                 <p className="text-[10px] opacity-60">Expires in 142 days</p>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-2/3" />
              </div>
              <Button size="sm" variant="secondary" className="w-full text-[10px] h-8 font-bold">Renew Documentation</Button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6">Onboarding Journey</h3>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-white border rounded-3xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${step.status === 'completed' ? 'bg-green-500/10 text-green-600' : step.status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <step.icon className="size-6" />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-lg">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.status.toUpperCase()} • {step.date}</p>
                    </div>
                  </div>
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="text-green-500 size-6" />
                  ) : (
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Action Required</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <Card className="border-none shadow-sm bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                   <Calendar className="text-accent size-5" />
                   <CardTitle className="font-headline">Cultural Connection</CardTitle>
                </div>
                <CardDescription>Don't miss out on campus events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="bg-white p-4 rounded-2xl shadow-sm space-y-2 border">
                      <p className="font-bold text-sm">International Food Festival</p>
                      <p className="text-xs text-muted-foreground">Main Quad • Friday, 4:00 PM</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs font-bold text-accent">RSVP Now</Button>
                   </div>
                 ))}
              </CardContent>
           </Card>

           <div className="p-6 bg-muted/20 rounded-3xl space-y-4">
              <h4 className="font-headline font-bold">Helpful Resources</h4>
              <div className="space-y-2">
                 {["Housing Guide", "Health Insurance Info", "Banking for Students", "CPT/OPT Workshops"].map(item => (
                   <button key={item} className="w-full text-left p-3 rounded-xl bg-white hover:bg-primary/5 transition-colors text-sm font-medium flex items-center justify-between">
                     {item}
                     <Clock className="size-3 text-muted-foreground" />
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
