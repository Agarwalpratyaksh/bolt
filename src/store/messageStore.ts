import {create} from "zustand";

export type MessageContextType = {
  role: "User" | "Ai";
  content: string;
};

type MessagesStore = {
  messages: MessageContextType[];
  addMessage: (message: MessageContextType) => void;
  setMessages: (messages: MessageContextType[]) => void;
  clearMessages: () => void;
};

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  // addMessage: (message) => set(() => ({ messages: [ message] })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),
}));
