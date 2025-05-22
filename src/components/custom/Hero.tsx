/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { MessageContext } from '@/context/MessageContext'
import { UserDetailContext } from '@/context/UserDetailsContext'
import SignInDialogue from './SignInDialogue'
import { useMessagesStore } from '@/store/messageStore'

function Hero() {
  const [userInput,setUserInput] = useState<string>()
  const [openDialogue, setOpenDialogue] = useState<boolean>(false)



  const userInfoContext = useContext(UserDetailContext)
  if(!userInfoContext){return null}
  const {userInfo,setUserInfo} = userInfoContext

  

  // const messageContext = useContext(MessageContext)
  // if(!messageContext){
  //   return null;
  // }
  // const {message,setMessage} = messageContext

  //using zustand in place of context

  const { messages, addMessage } = useMessagesStore();


  const onGenerate = (input:string)=>{
    if(input == undefined ||!input.trim() ){
      return alert("Enter the Prompt")
    }


    //check for username authentication
    if(!userInfo?.username){
      setOpenDialogue(true)
    }

   
    // setMessage([{
    //   role:'User',
    //   content: input
    // }])
    // console.log(message)
    addMessage({
      role:"User",
      content: input
    })
    console.log(messages)


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