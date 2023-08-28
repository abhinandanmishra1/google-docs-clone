const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const {
  findOrCreateDocument,
  updateDocument,
} = require("./controllers/DocumentController");

const passport = require("passport");
const passportSetup = require("./passport");

const authRoute = require("./routes/auth");

const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cookieSession({ name: "session", keys: ["abhi"], maxAge: 24 * 60 * 60 * 1000 })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  cookieSession({ name: "session", keys: ["abhi"], maxAge: 24 * 60 * 60 * 100 })
);

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
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);
    } catch (err) {
      console.log(err);
    }

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });

    socket.on("save-document", (data) => {
      updateDocument(documentId, data);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoute);
