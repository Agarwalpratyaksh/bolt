import { HelpCircle, LogOut, Settings } from "lucide-react";
import React from "react";
import { useSidebar } from "../ui/sidebar";

function SideBarFooter() {
  const { open } = useSidebar();

  const options = [
    { name: "Settings", icon: Settings },
    { name: "Help Center", icon: HelpCircle },
    { name: "Sign Out", icon: LogOut },
  ];

  return (
    <div className="p-2 mb-10 space-y-2">
      {options.map((option, index) => (
        <div
          key={index}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer hover:bg-muted hover:text-foreground"
        >
          <option.icon className="w-5 h-5" />
          {open && <span className="text-sm font-medium">{option.name}</span>}
        </div>
      ))}
    </div>
  );
}

export default SideBarFooter;
