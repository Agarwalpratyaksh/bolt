import { useUserDetailStore } from "@/store/userDetailsStore";
import React from "react";

function Header() {
  const { userInfo } = useUserDetailStore();
  return (
    <div className="bg-gray-800">
      Header
      {JSON.stringify(userInfo)}
    </div>
  );
}

export default Header;
