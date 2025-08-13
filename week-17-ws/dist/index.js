import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
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
//# sourceMappingURL=index.js.map