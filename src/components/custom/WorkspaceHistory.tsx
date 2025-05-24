/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useUserDetailStore } from "@/store/userDetailsStore";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";

type Workspace = {
  _id: Id<"workspace">;
  _creationTime: number;
  fileDate?: any;
  message: any;
  user: Id<"users">;
};

function WorkspaceHistory() {
  const { userInfo } = useUserDetailStore();
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const convex = useConvex();
  const { open, toggleSidebar } = useSidebar();

  useEffect(() => {
    userInfo && getWorkspaceData();
  }, [userInfo]);

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.getAllWorkspace, {
      userId: userInfo?._id as Id<"users">,
    });
    setWorkspaceList(result);
  };

  return (
    <div className="">
      {open && (
        <h2 className="font-medium text-lg text-center pt-5">Your Chats</h2>
      )}
      {workspaceList.map((workspace, index) => (
        <Link key={index} href={`/workspace/${workspace._id}`}>
          <h2
            onClick={toggleSidebar}
            className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer text-center"
          >
            {open ? (
              workspace.message[0].content
            ) : (
              <span
                className={"w-2 h-2 bg-white rounded-full inline-block mx-auto"}
              />
            )}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default WorkspaceHistory;
