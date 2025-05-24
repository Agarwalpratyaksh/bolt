"use client";

import { AppSidebar } from "@/components/custom/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
