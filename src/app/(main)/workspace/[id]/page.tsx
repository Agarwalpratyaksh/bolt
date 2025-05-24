import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

function Workspace() {
  return (
    <div className="p-8 pt-4 no-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ChatView />

        <div className="col-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
