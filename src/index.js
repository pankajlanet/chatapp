const express = require('express')
const path = require("path")
const http = require('http')
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)

const io = socketio(server)


app.use(express.static(path.join(__dirname,'../public'))) // rendering the static webpages


// let count = 0;
// io.on('connection',(socket)=> {
//     console.log("connection is eastablished")
//     socket.emit("countUpdated" , count )

//     // socket.on('increment' ,()=> {
//     //     count++;
//     //     socket.emit("countUpdated" , count)
//     // })
//     socket.on('increment' ,()=> {
//         count++
//         io.emit('countUpdated',count)
//     })
// })

io.on("connection" ,(socket)=> {
    io.emit("Welcome" , 'welcome to the website')
})

io.on('send' ,(socket)=> {
    socket.emit('send', 'message send')

})


app.get('/' ,(req,res)=> {
    res.send("This is home page1")
})



server.listen(3000 , ()=> {
    console.log("Server is hosted on port : ", 3000)
})