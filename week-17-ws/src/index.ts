import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("user connected");
  socket.send("Welcome to the server!");

  socket.on("message", (message) => {
    if (message.toString() === "ping") {
      socket.send("pong");
      return;
    }
    console.log("message received: " + message);
  });
});
