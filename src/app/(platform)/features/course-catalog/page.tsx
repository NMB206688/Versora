"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Users, 
  ArrowUpRight, 
  LayoutGrid, 
  GraduationCap,
  Zap,
  Star,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CourseCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Science", "Computer Science", "Economics", "History", "Arts"];

  const catalogCourses = [
    {
      id: "cs101",
      title: "Introduction to Quantum Physics",
      description: "Explore the fundamental principles of quantum mechanics, from wave-particle duality to entanglement.",
      instructor: "Dr. Aris Thorne",
      category: "Science",
      duration: "12 Weeks",
      students: "1.2k",
      rating: 4.9,
      image: PlaceHolderImages.find(img => img.id === "course-thumbnail-1")?.imageUrl,
      color: "bg-blue-500"
    },
    {
      id: "eco202",
      title: "Global Economics 101",
      description: "An analytical journey through macroeconomic theory and the forces shaping global markets.",
      instructor: "Prof. Sarah Miller",
      category: "Economics",
      duration: "10 Weeks",
      students: "850",
      rating: 4.7,
      image: PlaceHolderImages.find(img => img.id === "course-thumbnail-3")?.imageUrl,
      color: "bg-orange-500"
    },
    {
      id: "hist105",
      title: "Advanced Data Structures",
      description: "Master complex algorithms and organizational patterns for high-performance computing.",
      instructor: "Elena Rodriguez",
      category: "Computer Science",
      duration: "14 Weeks",
      students: "2.4k",
      rating: 4.8,
      image: PlaceHolderImages.find(img => img.id === "course-thumbnail-2")?.imageUrl,
      color: "bg-purple-500"
    },
    {
      id: "art303",
      title: "Neural Aesthetics",
      description: "The intersection of artificial intelligence and creative expression in the digital age.",
      instructor: "Julian Voss",
      category: "Arts",
      duration: "8 Weeks",
      students: "420",
      rating: 4.6,
      image: "https://picsum.photos/seed/art/600/400",
      color: "bg-pink-500"
    }
  ];

  const filteredCourses = catalogCourses.filter(course => {
    (selectedCategory === "All" || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-muted/5 min-h-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-headline font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full border border-primary/10">
            <BookOpen className="size-4" /> Academic Inventory
          </div>
          <h2 className="text-5xl font-headline font-bold text-primary tracking-tight leading-[1.1]">Course Discovery Hub</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Expand your academic DNA. Browse our intelligence-curated collection of institutional modules and research pathways.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl h-16 px-8 border-primary/10 font-bold bg-white">
            <LayoutGrid className="size-5 mr-3" /> My Enrollments
          </Button>
          <Button className="rounded-2xl h-16 px-10 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
            <Zap className="size-5 mr-2" /> Quick Enroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Catalog Area */}
        <div className="lg:col-span-8 space-y-10">
          {/* Search & Categories */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-5 h-6 w-6 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search by course name, code, or instructor..." 
                  className="h-16 pl-14 pr-4 text-lg rounded-[1.5rem] border-none shadow-sm bg-white focus-visible:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-16 w-16 rounded-[1.5rem] border-none shadow-sm bg-white">
                <Filter className="size-6 text-muted-foreground" />
              </Button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-6 h-10 font-bold text-xs uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white border-primary/5 hover:bg-primary/5 hover:text-primary'}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {catalogCourses.map((course) => (
              <Card key={course.id} className="border-none shadow-[0_15px_50px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  {course.image && (
                    <Image 
                      src={course.image} 
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white border-white/20 font-bold text-[9px] uppercase tracking-widest py-1 px-3">
                    {course.category}
                  </Badge>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white/90">
                    <Star className="size-3 text-accent fill-accent" />
                    <span className="text-xs font-bold">{course.rating}</span>
                  </div>
                </div>
                <CardHeader className="p-8 pb-4 flex-1">
                  <CardTitle className="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-muted-foreground line-clamp-2 mt-2">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="size-3" /> {course.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="size-3" /> {course.students} Enrolled</span>
                  </div>
                  <Button asChild className="w-full h-14 rounded-2xl font-bold bg-muted/20 text-primary hover:bg-primary hover:text-white transition-all shadow-none">
                    <Link href={`/course/${course.id}`}>
                      View Curriculum <ArrowUpRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-primary text-primary-foreground border-none rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="space-y-4 relative z-10">
              <Sparkles className="size-10 text-accent animate-pulse" />
              <h4 className="text-2xl font-headline font-bold leading-tight">AI Strategy Recommendations</h4>
              <p className="opacity-70 text-sm leading-relaxed font-medium">
                Based on your performance in <strong>Quantum Mechanics</strong>, the system suggests enrolling in <strong>Neural Aesthetics</strong> to bridge your technical and creative domains.
              </p>
            </div>
            <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-bold relative z-10 shadow-xl shadow-black/10">
              Apply Strategy
            </Button>
          </Card>

          <div className="space-y-6 px-2">
            <h3 className="text-xl font-headline font-bold flex items-center gap-3">
              <GraduationCap className="size-6 text-accent" /> Trending Pathways
            </h3>
            <div className="space-y-4">
              {[
                { title: "Quantum Data Analysis", enrollments: "+124 this week", color: "bg-blue-500" },
                { title: "Macroeconomic Reflections", enrollments: "+85 this week", color: "bg-orange-500" },
                { title: "Digital Ethics & Compliance", enrollments: "+210 this week", color: "bg-purple-500" }
              ].map((path, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl border shadow-sm hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`size-2 rounded-full ${path.color}`} />
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{path.title}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{path.enrollments}</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-center gap-2">
              View All Pathways <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
