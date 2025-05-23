import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createWorkspace =  mutation({
    args:{
        message: v.any(),
        users: v.id('users')
    },
    handler: async (ctx,args)=>{
        const workspaceId = await ctx.db.insert("workspace",{
            message: args.message,
            user: args.users
        })
        return workspaceId;
    }
})

export const getWorkspace = query({
    args:{
        workspaceId: v.id('workspace')
    },
    handler:async(ctx, args)=> {
        const result = await ctx.db.get(args.workspaceId)
        return result
    },
})

