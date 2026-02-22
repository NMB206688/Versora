
"use client";

import * as React from "react";
import { 
  BookOpen, 
  LayoutDashboard, 
  PenTool, 
  Search, 
  Users, 
  Settings, 
  HelpCircle, 
  GraduationCap,
  Sparkles,
  Zap,
  Briefcase,
  Globe
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AppSidebar({ role = "student" }: { role?: "student" | "instructor" | "admin" }) {
  const pathname = usePathname();

  const navigation = {
    student: [
      { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
      { name: "My Courses", href: "/dashboard/student#courses", icon: BookOpen },
      { name: "AI Writing Center", href: "/features/ai-writing-center", icon: PenTool },
      { name: "AI Research Hub", href: "/features/ai-research-hub", icon: Search },
      { name: "Skills Map", href: "/features/skills-map", icon: Zap },
      { name: "Success Zone", href: "/hubs/international-students", icon: GraduationCap },
    ],
    instructor: [
      { name: "Dashboard", href: "/dashboard/instructor", icon: LayoutDashboard },
      { name: "Course Studio", href: "/course/cs101", icon: BookOpen },
      { name: "Grading Center", href: "/features/grading-feedback", icon: Zap },
      { name: "Analytics Hub", href: "/features/insights", icon: Sparkles },
    ],
    admin: [
      { name: "System Health", href: "/admin/health", icon: Zap },
      { name: "Program Innovation", href: "/admin/innovation", icon: Sparkles },
      { name: "User Management", href: "/admin/users", icon: Users },
    ]
  };

  const menuItems = navigation[role] || navigation.student;

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-sidebar">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-sidebar-border/50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-hover:scale-105 transition-transform">
            <Zap className="size-5" />
          </div>
          <span className="font-headline font-bold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            EdTech OS
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Platform</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.name}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground transition-colors"
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Ecosystem</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Global Scholars">
                <Link href="/features/global-scholars">
                  <Globe className="size-4" />
                  <span>Global Scholars</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Career Gateway">
                <Link href="/features/career-gateway">
                  <Briefcase className="size-4" />
                  <span>Career Gateway</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Support">
              <Link href="/support">
                <HelpCircle className="size-4" />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
