const express = require('express')
const path = require("path")
const http = require('http')
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)

const io = socketio(server)


app.use(express.static(path.join(__dirname,'../public'))) // rendering the static webpages


io.on("connection" ,(socket)=> {
    io.emit("Welcome" , 'Welcome to the Chat App')
    console.log("user connected")
    

    socket.on('send' ,(e)=> {
        console.log(e)
        socket.emit('received', 'data received')
    })

    socket.on('disconnect',()=> {
        console.log("user disconnnected")
    })
})




app.get('/' ,(req,res)=> {
    res.send("This is home page1")
})

//sending complete html with as a resonse
const pa = path.join(__dirname,"test.html")
app.get('/another' , (req,res)=> {
    res.sendFile(pa)
})



server.listen(3000 , ()=> {
    console.log("Server is hosted on port : ", 3000)
})