"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserDetailStore } from "@/store/userDetailsStore";
import { useRouter } from "next/navigation";

export default function Provider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const convex = useConvex();

  //zustand libs
  const { setUserInfo } = useUserDetailStore();
  const router = useRouter();

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") as string);

      if (!user) {
        router.push("/");

        return;
      }

      if (user && user.email) {
        const email = user.email;

        // Check if convex is available
        if (convex) {
          try {
            const data = await convex.query(api.users.getUser, { email });
            console.log(data);
            setUserInfo(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.error("Convex client is not initialized");
        }
      }
    }
  };

  React.useEffect(() => {
    isAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Header />

        {/* <SidebarTrigger /> */}
        {children}

        {/* </SidebarProvider> */}
      </NextThemesProvider>
    </GoogleOAuthProvider>
  );
}
