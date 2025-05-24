"use client";
import { useUserDetailStore } from "@/store/userDetailsStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useMessagesStore } from "@/store/messageStore";

function Header() {
  const { userInfo ,setUserInfo} = useUserDetailStore();
  const {setMessages} = useMessagesStore()
  const [userImage, setUserImage] = useState("");
  const router = useRouter()
  // const { toggleSidebar } = useSidebar()

  useEffect(() => {
    if (userInfo?.picture) {
      setUserImage(userInfo.picture);
    
    }
  }, [userInfo]);

  const logout = async ()=>{
    googleLogout();
    if(typeof window != undefined){

      localStorage.removeItem("user")
      setUserInfo(undefined)
      setMessages([])


    }
    router.push('/')

  }

  console.log("user Info after logout");
  console.log(userInfo?.picture);
  console.log(userImage);


  return (
    <div className=" flex justify-between py-3 px-8 md:px-12 md:pl-20 items-center">
      <div>
        <Image src={'/logo2.png'} alt="Logo" height={50} width={50} className="scale-170 rounded-full"/>
      </div>

      {
        userInfo ? <div className="flex gap-4">
        <Button variant={'secondary'}>Download</Button>
        <Button >Deploy</Button>
        <Button variant={'ghost'} onClick={logout}>Logout</Button>
        {userImage && (
          <Image
            className="rounded-full shrink-0"
            src={userImage}
            alt="User Image"
            width={40}
            height={40}
            onError={() => setUserImage("/default-avatar.png")}
            // onClick={toggleSidebar}
          />
        ) }
      </div> : <div>
      <Button variant={'ghost'} >Get Started</Button>
        
      </div>
      }
      
    </div>
  );
}

export default Header;
