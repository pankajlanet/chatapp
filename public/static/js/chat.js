console.log("chat js is attached")
const socket =  io();;
socket.on('Welcome' , (count)=> {
    const show = document.getElementById('show')
    setTimeout(()=> {
        show.innerHTML = count
    }, 2000)

})

const usermsg = document.getElementById('usermsg')
const chatbox = document.getElementById("chatbox")


//sumbit handler
 const submitmsg = document.getElementById('submitmsg');
 submitmsg.addEventListener('click',()=> {
    const node = document.createElement('p')
    node.innerHTML = usermsg.value;
    chatbox.appendChild(node)
    socket.emit('send',usermsg.value)
    
 })

 socket.on('send' ,(m)=> {
     console.log(m)
 })

const output = document.getElementById('output')

const buttonInc = document.getElementById('incr');
buttonInc.addEventListener('click' ,()=> {
    socket.emit('increment')
     output.value = value   

})

