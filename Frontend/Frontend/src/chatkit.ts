import { useChatKit } from "@openai/chatkit-react";

// Agar aap Vite use kar rahe hain to 'import.meta.env.VITE_API_URL' use hoga.
// Agar simple Create React App hai to 'process.env.REACT_APP_API_URL' use hoga.
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function useIslamicChatKit() {
  return useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch(`${BACKEND_URL}/api/chatkit/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to create session");
        }
        
        const data = await res.json();
        return data.client_secret;
      },
    },
  });
}