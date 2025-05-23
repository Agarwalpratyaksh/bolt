// store/userDetailStore.ts
import { create } from "zustand";

// Define the type for the User Details
export type UserDetailContextType = {
  name: string;
  email: string;
  picture: string;
  uid:string,
  _id: string,
};

type UserDetailStore = {
  userInfo: UserDetailContextType | undefined;
  setUserInfo: (userInfo: UserDetailContextType | undefined) => void;
};

export const useUserDetailStore = create<UserDetailStore>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
