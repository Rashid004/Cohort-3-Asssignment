import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!socket) {
      return;
    }
    const message = inputRef.current?.value;
    if (!message) {
      return;
    }
    socket.send(message);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    setSocket(ws);

    ws.onmessage = (event) => {
      console.log(event.data);
      alert(event.data);
    };
  }, []);
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Send a message" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
