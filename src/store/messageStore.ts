import {create} from "zustand";

export type MessageContextType = {
  role: "User" | "Ai";
  content: string;
};

type MessagesStore = {
  messages: MessageContextType[];
  addMessage: (message: MessageContextType) => void;
  clearMessages: () => void;
};

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
