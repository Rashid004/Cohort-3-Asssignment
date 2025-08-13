import WebSocket, { WebSocketServer } from "ws";

type JoinMsg = { type: "join"; payload: { roomId: string } };
type ChatMsg = { type: "chat"; payload: { roomId: string; message: string } };
interface User {
  socket: WebSocket;
  room: string;
}

const wss = new WebSocketServer({ port: 8080 });

let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type === "join") {
      allSockets = allSockets.filter((u) => u.socket !== socket);
      allSockets.push({ socket, room: parsedMessage.payload.roomId });
      return;
    }

    if (parsedMessage.type === "chat") {
      const { roomId, message } = parsedMessage.payload;

      allSockets.forEach((user) => {
        if (user.room === roomId && user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(message);
        }
      });
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter((u) => u.socket !== socket);
  });
});
