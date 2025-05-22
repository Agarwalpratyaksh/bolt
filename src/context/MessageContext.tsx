'use client'
import { createContext } from 'react'
 
export type MessageContextType = {
    role: "User"|"Ai",
    content: string

}

interface MessageContextProps {
    message: MessageContextType[] | undefined;
    setMessage: React.Dispatch<React.SetStateAction<MessageContextType[] | undefined>>;
  }
  
export const MessageContext = createContext<MessageContextProps | undefined>(undefined);
  
