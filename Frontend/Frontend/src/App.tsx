import { ChatKit } from "@openai/chatkit-react";
import { useIslamicChatKit } from "./chatkit";
import "./style.css";

function App() {
  const { control } = useIslamicChatKit();

  return (
    <div className="app">
      <h1>🌙 Islamic Knowledge Assistant</h1>

      <div className="chat-container">
        <ChatKit control={control} />
      </div>
    </div>
  );
}

export default App;