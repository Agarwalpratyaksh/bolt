/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Link } from 'lucide-react'
import React, {  useState } from 'react'
import { Button } from '../ui/button'
// import { UserDetailContext } from '@/context/UserDetailsContext'
import SignInDialogue from './SignInDialogue'
import { MessageContextType, useMessagesStore } from '@/store/messageStore'
import { useUserDetailStore } from '@/store/userDetailsStore'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'

function Hero() {
  const [userInput,setUserInput] = useState<string>()
  const [openDialogue, setOpenDialogue] = useState<boolean>(false)


   //using zustand in place of context
   const { messages, addMessage } = useMessagesStore();
   const { userInfo, setUserInfo } = useUserDetailStore();


   const createWorkspace = useMutation(api.workspace.createWorkspace)

   const router = useRouter()

 

  const onGenerate = async (input:string)=>{
    if(input == undefined ||!input.trim() ){
      return alert("Enter the Prompt")
    }


    //check for username authentication
    if(!userInfo?.email){
      setOpenDialogue(true)
    }

   const msg: MessageContextType = {
    role:"User",
    content: input
  }
    addMessage(msg)
    console.log(messages)

    const workspaceId = await createWorkspace({
      message:[msg],
      users: userInfo?._id as Id<"users">
    })

    console.log(workspaceId)
    router.push('/workspace/'+workspaceId)


  }



  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        
    <div>
        NavBar

        
    </div>
    <div className='border border-white p-4'>
        <input type="text" className='px-2 py-2 rounded-md my-2' required onChange={(e)=>setUserInput(e.target.value)}/>
        <div className='flex justify-between'>
            <Link/>
            
            <Button onClick={()=>{
              //@ts-expect-error problem of undefined
              onGenerate(userInput)}} >Go</Button>
        </div>
    </div>


    <SignInDialogue isOpen={openDialogue} changeOpen= {()=>setOpenDialogue(false)}/>

    </div>
  )
}

export default Hero