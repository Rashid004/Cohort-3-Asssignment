import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [chat, setChat] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  const createWebSocketConnection = () => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to the WebSocket server");

      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "room1",
          },
        })
      );
    };

    socket.onmessage = (event) => {
      console.log("Received message: ", event.data);

      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setWs(socket);
  };

  const sendMessage = () => {
    if (ws && chat) {
      ws.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: "room1",
            message: chat,
          },
        })
      );
      setChat("");
    }
  };

  useEffect(() => {
    createWebSocketConnection();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Welcome to the Chat App!</h1>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <p key={index} className="chat-message">
            {message}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          style={{ color: "white" }}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
