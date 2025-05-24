/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ArrowRight, Link } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
// import { UserDetailContext } from '@/context/UserDetailsContext'
import SignInDialogue from "./SignInDialogue";
import { MessageContextType, useMessagesStore } from "@/store/messageStore";
import { useUserDetailStore } from "@/store/userDetailsStore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

const suggestions =['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen']

function Hero() {
  const [userInput, setUserInput] = useState<string>();
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);

  //using zustand in place of context
  const { messages } = useMessagesStore();
  const { userInfo } = useUserDetailStore();

  const createWorkspace = useMutation(api.workspace.createWorkspace);

  const router = useRouter();

  const onGenerate = async (input: string) => {
    if (input == undefined || !input.trim()) {
      return alert("Enter the Prompt");
    }

    //check for username authentication
    if (!userInfo?.email) {
      setOpenDialogue(true);
    }

    const msg: MessageContextType = {
      role: "User",
      content: input,
    };
    // addMessage(msg)
    console.log(messages);

    const workspaceId = await createWorkspace({
      message: [msg],
      users: userInfo?._id as Id<"users">,
    });

    console.log(workspaceId);
    router.push("/workspace/" + workspaceId);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      {/* <div className='border border-white p-4'>
        <input type="text" className='px-2 py-2 rounded-md my-2' required onChange={(e)=>setUserInput(e.target.value)}/>
        <div className='flex justify-between'>
            <Link/>
            
            <Button onClick={()=>{
              //@ts-expect-error problem of undefined
              onGenerate(userInput)}} >Go</Button>
        </div>
    </div> */}

    <h2 className="text-4xl font-extrabold py-2">What do you want to build ?</h2>
    <h2>Prompt, run, edit, and deploy React web apps.</h2>
      <div className="p-5 border rounded-xl max-w-2xl w-full mt-3 bg-zinc-900">
        <div className="flex gap-2">
          <textarea
            value={userInput}
            placeholder="What you want to add?"
            className="outline-none bg-transparent w-full h-44 resize-none no-scrollbar"
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
      <div className="flex my-12 flex-wrap max-w-2xl items-center justify-center gap-3">
        {suggestions.map((suggestion, index) => (
          <h2
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            key={index}
            onClick={() => setUserInput(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>

      <SignInDialogue
        isOpen={openDialogue}
        changeOpen={() => setOpenDialogue(false)}
      />
    </div>
  );
}

export default Hero;
