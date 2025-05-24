
"use client"
import {

  Menu,
  MessageCircleCodeIcon,

} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarHeader,

  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SidebarFooter";


export function AppSidebar() {
    const { open, toggleSidebar } = useSidebar();
  
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="pt-5 px-2 flex flex-col items-center gap-4">
          {/* Menu Button */}
          <div
            className="cursor-pointer hover:bg-white/10 rounded-xl p-2 flex items-center justify-center"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </div>
  
          {/* Start New Chat Button */}
          <Link href={'/'}>
          <Button className="w-full flex items-center justify-center gap-2"
        //    onClick={()=> router.push('/')}
           >
            <MessageCircleCodeIcon className="w-4 h-4" />
            {open && "Start New Chat"}
          </Button>
          </Link>
        </SidebarHeader>
  
        <SidebarContent>
          <SidebarGroup>
            <WorkspaceHistory />
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter>
          <SideBarFooter />
        </SidebarFooter>
      </Sidebar>
    );
  }
  
