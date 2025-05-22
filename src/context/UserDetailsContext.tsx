'use client'
import { createContext } from 'react'
 
export type UserDetailContextType = {
    username:string,
    email:string,


}


interface UserDetailProp {
    userInfo: UserDetailContextType | undefined;
    setUserInfo: React.Dispatch<React.SetStateAction<UserDetailContextType| undefined>>;
  }

export const UserDetailContext = createContext<UserDetailProp | undefined>(undefined);
  
