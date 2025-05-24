"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackCodeEditor,
  SandpackTranspiledCode,
  SandpackPreview,
  SandpackLayout,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import defaultFiles from "@/data/files";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files,setFiles] = useState(defaultFiles.DEFAULT_FILE)

  return (
    <div className="h-80vh">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && " bg-blue-500 bg-opacity-25 p-1 px-3  rounded-full"} `}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && " bg-blue-500 bg-opacity-25 p-1 px-3  rounded-full"} `}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        files={files}
        theme={"dark"}
        customSetup={{
          dependencies: defaultFiles.DEPENDANCY,
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"]
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} showTabs={false} />
              <SandpackPreview style={{ height: "80vh" }} showNavigator />

            </>
          ) : (
            <>
              <SandpackPreview style={{ height: "80vh" }} showNavigator />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
