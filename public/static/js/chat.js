console.log("chat js is attached")

const socket =  io();
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
const userCount = document.getElementById('count')
const exit = document.getElementById('exit')
const submitLocation = document.getElementById('submitLocation')

socket.on('userUpdate',(value)=> {

    userCount.innerHTML = value

})

exit.addEventListener('click',()=>{
    window.close()
})

//sumbit handler
 submitmsg.addEventListener('click',()=> {
    socket.emit('send',usermsg.value ,()=> {
    } )
    
 })

 socket.on('locationReceived',(locationLink)=> {
    const node = document.createElement('a')
    const textnode = document.createTextNode("User Location")
    node.appendChild(textnode);
    node.title="This is link"
    node.href = locationLink
    chatbox.appendChild(node)

 })

 submitLocation.addEventListener('click',()=> {
    if(!navigator.geolocation){
        alert("geo location is not support by the browser")
    }
    else{
        console.log(navigator.geolocation.getCurrentPosition((position)=> {
                console.log(position.coords.latitude)

                socket.emit('location',"https://www.google.com/maps?q="+position.coords.latitude+','+position.coords.longitude)
        }))
    }
 })

 

 socket.on('received' , (m)=> {

    if(m === 'A new User have joined')
    {
        const node = document.createElement('p')
        node.innerHTML = m;
        node.style.color = 'green'
        chatbox.appendChild(node)
    }
    else if(m === 'User left')
    {
        const node = document.createElement('p')
        node.innerHTML = m;
        node.style.color = 'red'
        chatbox.appendChild(node)

    }
    else{
        const node = document.createElement('p')
        node.innerHTML = m;
        chatbox.appendChild(node)
    }


    
 })

// const buttonInc = document.getElementById('incr');
// buttonInc.addEventListener('click' ,()=> {
    // socket.emit('increment')
    //  output.value = value   
// 
// })

