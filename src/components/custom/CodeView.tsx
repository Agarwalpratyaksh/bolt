/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import defaultFiles from "@/data/files";
import { useMessagesStore } from "@/store/messageStore";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import axios from "axios";
import { Loader2Icon } from "lucide-react";




function CodeView() {
  const {id} =  useParams()
  const [activeTab, setActiveTab] = useState("code");

  const defFiles = defaultFiles.DEFAULT_FILE
  const [files,setFiles] = useState(defFiles)

  const [loading,setLoading] = useState(false)
  const {messages} = useMessagesStore()

  const convex = useConvex()

  const workspaceId = id as Id<"workspace">

  const updateFiles = useMutation(api.workspace.updateFile)

  console.log(messages)


  useEffect(()=>{
    id && getFiles()
  },[id])

  const getFiles = async()=>{
    setLoading(true)
    const result =await  convex.query(api.workspace.getWorkspace,{
      workspaceId
    })

    

    const mergedFiles = {...defFiles,...result?.fileDate}
    console.log(mergedFiles)
    setFiles(mergedFiles)
    setLoading(false)
  }


  useEffect(() => {
    if (messages.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "User") {
        generateAiCode();
      }
    }
  }, [messages]);
  const generateAiCode = async ()=>{
    setLoading(true)

    const prompt = JSON.stringify(messages)

    const response = await axios.post('/api/ai-codegen',{
      prompt
    })

    console.log(response.data)
    const aiResponse = response.data

    const mergedFiles = {...defFiles,...aiResponse?.files}
    setFiles(mergedFiles)

    await updateFiles({
      workspaceId,
      files:aiResponse.files
    })

    setLoading(false)


  }

  return (
   
      <div className="relative">

     
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

            </>
          ) : (
            <>
              <SandpackPreview style={{ height: "80vh" }} showNavigator />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-zinc-950/70 bg-opacity-80 absolute top-0 h-full w-full flex justify-center items-center">
          <Loader2Icon className="animate-spin w-10 h-10 text-white" />
          <h2>Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
