

const socket = io();
// WELCOME Message After two seconds when the page loads
socket.on("Welcome", (welcomeMessage) => {
    const show = document.getElementById("show");
    setTimeout(() => {
        show.innerHTML = welcomeMessage.text
    }, 2000);
});

//getting dom elements
const usermsg = document.getElementById("usermsg");
const chatbox = document.getElementById("chatbox");
const submitmsg = document.getElementById("submitmsg");
const output = document.getElementById("output");
const userCount = document.getElementById("count");
const exit = document.getElementById("exit");
const sidebar = document.getElementById('sidebar')


socket.on("userUpdate", (value) => {
    userCount.innerHTML = value;
});

// exit button Clicked
exit.addEventListener("click", (event) => {
    event.preventDefault()
    window.close()
});

// ********************************************************************************************************************
                                            // Client Side Messages
// ********************************************************************************************************************

//When Send button is clicked
submitmsg.addEventListener("click", () => {
    socket.emit("send", usermsg.value, (error) => {
        if (error) {
            alert(error);
        }
        console.log("Message Delevered");
    });
    usermsg.value = "";
    // disableing the button until the message is delevered
    submitmsg.disabled = true
});

// Receving the message
socket.on("received", (m) => {

    if (m.text.includes("have joined")) {
        const node = document.createElement("p");
        node.innerHTML =  m.text + " at (" + m.createdAt + ")";
        node.style.color = "green";
        chatbox.appendChild(node);
    } else if (m.text.includes("left the room")) {
        // console.log(m)
        // const div = document.createElement('div')
        // div.className = 'alert alert-danger'
        // div.innerHTML = m.text
        // chatbox.append(div)

    
        const node = document.createElement("p");
        node.innerHTML = m.text + " at (" + m.createdAt + ")";
        node.style.color = "red";
        chatbox.appendChild(node);
    } else {
        // const node = document.createElement("p");
        // node.innerHTML = m.text;
        // chatbox.appendChild(node);
   
        const div = document.createElement('div')
        div.className = m.color
        div.innerHTML =  m.name +  " :   " +  m.text 

        chatbox.append(div)

    }

    submitmsg.disabled = false
    usermsg.focus()
    chatbox.scrollTop = chatbox.scrollHeight
});


// ********************************************************************************************************************
                                            // Client Side Location
// ********************************************************************************************************************

// Sending the location to server when button is clicked
submitLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("geo location is not support by the browser");
    } else {
        console.log(
            navigator.geolocation.getCurrentPosition((position) => {

                socket.emit(
                    "location",
                    "https://www.google.com/maps?q=" +position.coords.latitude + "," + position.coords.longitude,
                    (message) => {
                        console.log("Message Delevired");
                    }
                );
            })
        );
    }
  
});


// Receing the location on client side from server
socket.on("locationReceived", (locationLink) => {
    const node = document.createElement("a");
    const textnode = document.createTextNode("User Location");
    node.appendChild(textnode);
    node.title = "This is link";
    node.href = locationLink;
    chatbox.appendChild(node);
    submitLocation.disabled  = false
});

const params = new URLSearchParams(window. location. search)
const username = params.get('username');
const room = params.get('room')
console.log("user is : " , username , "room is : " , room) 
// const buttonInc = document.getElementById('incr');
// buttonInc.addEventListener('click' ,()=> {
// socket.emit('increment')
//  output.value = value
//
// })


socket.emit('join' ,{username , room} , (error)=> {
        console.log(error)
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

socket.emit('getuser',"test")
socket.on('gettingUsers', (user)=> {
    removeAllChildNodes(sidebar)
    for(const i of user)
    {
    const node = document.createElement('p')
    node.innerHTML = i.username;
    sidebar.appendChild(node)
    }
})
