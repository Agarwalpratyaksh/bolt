import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import axios from "axios";
import { useUserDetailStore } from "@/store/userDetailsStore";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';

export type GoogleUser = {
  email: string;
  name: string;
  picture: string;
  sub: string;
};

function SignInDialogue({
  isOpen,
  changeOpen,
}: {
  isOpen: boolean;
  changeOpen: (e: boolean) => void;
}) {
  const createUser = useMutation(api.users.createUser);
  const { userInfo, setUserInfo } = useUserDetailStore();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse.access_token } }
      );

      console.log(userInfo);
      changeOpen(false);

      setUserInfo(userInfo.data);

      //saving our data to databse
      const user:GoogleUser = userInfo.data;
     const dbresult = await createUser({
        email: user.email,
        name: user.name,
        picture: user.picture,
        uid:uuidv4()
       });

       console.log(dbresult)
       //saving user to localstorage
       localStorage.setItem("user",JSON.stringify(user))
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGoogleLoginClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    googleLogin();
  };

  useEffect(() => {
    console.log(userInfo?.email);
  }, [userInfo]);

  return (
    <Dialog open={isOpen} onOpenChange={changeOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Sign In with Google</DialogTitle>
          <DialogDescription className="flex flex-col items-center ">
            Click on the button below to sign in with google
            <Button className="w-full" onClick={handleGoogleLoginClick}>
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialogue;
