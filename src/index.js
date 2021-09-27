const express = require('express')
const path = require("path")
const http = require('http')
const socketio = require("socket.io")
const Filter = require('bad-words')

const app = express();
const server = http.createServer(app)

const io = socketio(server)


app.use(express.static(path.join(__dirname,'../public'))) // rendering the static webpages

let personConnected = 0
io.on("connection" ,(socket)=> {
    ++personConnected;

    console.log(personConnected)
    io.emit("Welcome" , 'Welcome to the Chat App')
    console.log("user connected")
    socket.broadcast.emit('received', "A new User have joined")
    socket.broadcast.emit('userUpdate' , personConnected);
    

    socket.on('send' ,(e , callback)=> {
        console.log(e)
        const filter = new Filter()
        if(filter.isProfane(e))
        {
            io.emit('received', "Bad Words are not" )
            callback()
        }
        else{
            io.emit('received', e )
        callback()
        }
        
    })

    socket.on('location' ,(position)=> {
        io.emit('locationReceived', position)

    })
    socket.on('disconnect',()=> {
        console.log("user disconnnected")
        socket.broadcast.emit('received', "User left")
        --personConnected
    socket.broadcast.emit('userUpdate' , personConnected);
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