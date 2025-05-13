const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // const readable = fs.createReadStream("test.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });

  const readable = fs.createReadStream("test.txt");
  readable.pipe(res);
});

server.listen(8080);
