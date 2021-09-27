
// Importing moudles in js 
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

// initilizing the  basic setup
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// hosting the static file 
app.use(express.static(path.join(__dirname, "../public"))); // rendering the static webpages

let personConnected = 0;       // Stores the number of connected users

io.on("connection", (socket) => {
  ++personConnected;
   // Things to do when user connect to server  
  console.log(personConnected);
  io.emit("Welcome", "Welcome to the Chat App");
  console.log("user connected");
  socket.broadcast.emit("received", "A new User have joined");
  socket.broadcast.emit("userUpdate", personConnected);

    // Sending the message to everyone received form client to everyone
  socket.on("send", (e, callback) => {
    console.log(e);
    const filter = new Filter();
    if (filter.isProfane(e)) {
      return callback("Profenity is not al");
    } else {
      io.emit("received", e);
      callback();
    }
  });

   // Sending the location to everyone received form client to everyone
  socket.on("location", (position, callback  /* callback is for providing the acknowlegement to the user */) => {
    io.emit("locationReceived", position);
    callback();
  });

  //When user get Disconnected
  socket.on("disconnect", () => {
    console.log("user disconnnected");
    socket.broadcast.emit("received", "User left");
    --personConnected;
    socket.broadcast.emit("userUpdate", personConnected);
  });
});


//Default home Page
app.get("/", (req, res) => {
  res.send("This is home page1");
});

//sending complete html with as a resonse
const pa = path.join(__dirname, "test.html");
app.get("/another", (req, res) => {
  res.sendFile(pa);
});

//Listening the server of the given port
server.listen(3000, () => {
  console.log("Server is hosted on port : ", 3000);
});
