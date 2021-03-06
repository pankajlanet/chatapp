
// Importing moudles in js 
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./message");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

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
 
  socket.broadcast.emit("userUpdate", personConnected);
  socket.on('join' , ({username , room } , callback) => {
    socket.join(room)
    const {error,user} = addUser({id : socket.id , username , room })
      if(error)
      {
          return callback(error)
      }

     io.emit("Welcome", generateMessage("Welcome to the app"));
     socket.broadcast.to(user.room).emit("received", generateMessage(`${user.username} have joined`) );

     
     callback()
  })
  
  socket.on('getuser',(test)=>  {

    const user = getUser(socket.id)
    const allUser = getUsersInRoom(user.room)
    io.to(user.room).emit('gettingUsers' , allUser)
  })


// ********************************************************************************************************************
                                            // Server Side Messages
// ********************************************************************************************************************

    // Sending the message to everyone received form client to everyone
  socket.on("send", (message, callback) => {

    const user =  getUser(socket.id)
    console.log(user.room)
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profenity is not allowed");
    } else {

           io.to(user.room).emit("received", generateMessage(message , user.username , user.color));
          callback(); 

        
    }
  });


// ********************************************************************************************************************
                                            //Server side Location
// ********************************************************************************************************************
   // Sending the location to everyone received form client to everyone
  socket.on("location", (position, callback  /* callback is for providing the acknowlegement to the user */) => {
    
    io.emit("locationReceived", position);
         callback();

  });


  //When user get Disconnected
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    // console.log(user)
    // console.log(user.room)
     const userAfterRemoval = getUsersInRoom(user.room)
    //  console.log(userAfterRemoval)

    if(user)
    {
          socket.broadcast.to(user.room). emit("received", generateMessage(`${user.username} left the room`));
    }

    io.to(user.room).emit('gettingUsers' , userAfterRemoval)
    --personConnected;
    socket.broadcast.emit("userUpdate", personConnected);
  });
});



//sending complete html with as a resonse
const pa = path.join(__dirname, "test.html");
app.get("/", (req, res) => {
  
  res.sendFile(pa);
});

//Listening the server of the given port
server.listen(process.env.PORT|| 3000, () => {
  console.log("Server is hosted on port : ", 3000);
});


