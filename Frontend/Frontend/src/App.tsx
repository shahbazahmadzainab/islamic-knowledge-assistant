import { ChatKit } from "@openai/chatkit-react";
import { useIslamicChatKit } from "./chatkit";
import "./style.css";

function App() {
  const { control } = useIslamicChatKit();

  return (
  <div className="app-container">
    <header className="app-header">
      <span className="logo-emoji">🌙</span>
      <h1>Islamic Knowledge Assistant</h1>
    </header>
    <div className="chat-container">
      <ChatKit control={control} />
    </div>
  </div>
);}