"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessageContext, MessageContextType } from "@/context/MessageContext";
import { UserDetailContext, UserDetailContextType } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Provider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [message, setMessage] = React.useState<MessageContextType[]>();
  const [userInfo, setUserInfo] = React.useState<UserDetailContextType>();

  return (
    
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
<UserDetailContext.Provider value={{userInfo,setUserInfo}}>
      <MessageContext.Provider value={{ message, setMessage }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          forcedTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}
        </NextThemesProvider>
      </MessageContext.Provider>
      </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    
  );
}
