const { Server } = require("socket.io");
const http = require("http");
const {
    createNewVersionDocument,
    updateDocument,
  } = require("./controllers/DocumentController");
  
const setUpSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("get-document", async (documentId) => {
      if (!documentId) return;

      try {
        const document = await createNewVersionDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document);
      } catch (err) {
        console.log(err);
      }

      socket.on("send-changes", (data) => {
        socket.broadcast.to(documentId).emit("recieve-changes", data);
      });

      socket.on("save-document", (data) => {
        console.log("save document", data);
        updateDocument(documentId, data);
      });
    });
  });
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

module.exports = setUpSocketServer;