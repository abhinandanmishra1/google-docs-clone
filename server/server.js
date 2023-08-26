const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const {
  findOrCreateDocument,
  updateDocument,
} = require("./controllers/DocumentController");

require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Databse Connected successfully");
});

const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    console.log("get document", documentId);
    if (!documentId) return;

    try {
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      console.log(document, document.data)
      socket.emit("load-document", document.data);
    } catch (err) {
      console.log(err);
    }

    socket.on("send-changes", (delta) => {
      console.log("send", documentId, delta);
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });

    socket.on("save-document", (data) => {
      console.log("save", documentId, data);
      updateDocument(documentId, data);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
