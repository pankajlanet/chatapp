console.log("chat js is attached")

const socket =  io();;
//welcome message after 2 sec when connection is established
socket.on('Welcome' , (count)=> {
    const show = document.getElementById('show')
    setTimeout(()=> {
        show.innerHTML = count
    }, 2000)

})


//getting dom elements
const usermsg = document.getElementById('usermsg')
const chatbox = document.getElementById("chatbox")
const submitmsg = document.getElementById('submitmsg');
const output = document.getElementById('output')


//sumbit handler
 submitmsg.addEventListener('click',()=> {
    const node = document.createElement('p')
    node.innerHTML = usermsg.value;
    chatbox.appendChild(node)
    socket.emit('send',usermsg.value)
    
 })

 socket.on('send' ,(m)=> {
     console.log(m)
 })

 socket.on('received' , (m)=> {
     console.log(m)
 })

// const buttonInc = document.getElementById('incr');
// buttonInc.addEventListener('click' ,()=> {
    // socket.emit('increment')
    //  output.value = value   
// 
// })

