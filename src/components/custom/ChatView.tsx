/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { MessageContextType, useMessagesStore } from "@/store/messageStore";
import { useUserDetailStore } from "@/store/userDetailsStore";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, addMessage ,setMessages} = useMessagesStore();
  const { userInfo } = useUserDetailStore();
  const updateMessages = useMutation(api.workspace.updateWorkspace);

  const [userInput, setUserInput] = useState("");
  const [currentStream, setCurrentStream] = useState("");
  const [loading, setLoading] = useState(false);

  const workspaceId = id as Id<"workspace">;

  useEffect(() => {
    id && getWorkspaceData();
    console.log("Use Effect function called")
  }, [id]);

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.getWorkspace, {
      workspaceId,
    });

    // const [destructuredMessage] = result?.message;
    // addMessage(destructuredMessage);
    setMessages(result?.message || []);


    console.log(messages)
  };

  useEffect(() => {
    if (messages.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "User") {
        getAiResponse();
      }
    }
  }, [messages]);

  //trying streaming response
  const getAiResponse = async () => {
    setCurrentStream("");
    setLoading(true);

    const prompt = JSON.stringify(messages);

    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
      let fullMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullMessage += chunk;
        setCurrentStream(fullMessage); // Update live view
      }

      const msg: MessageContextType = { role: "Ai", content: fullMessage };
      // Save the final message in the messages array
      addMessage(msg);

      //saving message to db
      await updateMessages({ message: [...messages,msg], workspaceId });
    }

    setLoading(false);
    setUserInput("");
  };

  const onGenerate = async (userInput: string) => {
    addMessage({ role: "User", content: userInput });
    setUserInput("");
  };

  return (
    <div className=" relative h-[85vh] flex flex-col">
      <div className=" flex-1 overflow-y-scroll no-scrollbar">
        {/* messages */}
        {messages.map((msg, index) => {
          return (
            <div
              className="p-3 rounded-lg mb-2 flex gap-2 items-start justify-start bg-zinc-800"
              key={index}
            >
              {msg.role == "User" && (
                <Image
                  className=" rounded-full shrink-0"
                  src={userInfo?.picture as string}
                  alt="User Image"
                  width={35}
                  height={35}
                />
              )}
              <div className="break-words whitespace-pre-wrap max-w-full overflow-hidden">
                {/* Wrap the message in a div and apply wrap styles here */}
                <h2 className="text-white">{msg?.content}</h2>
              </div>
            </div>
          );
        })}

        {/* streaming response  */}
        {loading && currentStream && (
          <div className="p-3 rounded-lg mb-2 flex gap-2 items-start justify-start bg-zinc-800">
            <div className="break-words whitespace-pre-wrap max-w-full overflow-hidden">
              <h2 className="text-white">{currentStream}</h2>
            </div>
          </div>
        )}
        {loading && !currentStream && (
          <div className="p-3 rounded-lg mb-2 flex gap-2 items-start justify-start bg-zinc-800">
            <h2 className="text-white">AI is thinking...</h2>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-5 border rounded-xl max-w-2xl w-full mt-3 bg-zinc-900">
        <div className="flex gap-2">
          <textarea
            value={userInput}
            placeholder="What you want to add?"
            className="outline-none bg-transparent w-full h-28 resize-none no-scrollbar"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 w-10 h-10 rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatView;
