const socket = io();
// WELCOME Message After two seconds when the page loads
socket.on("Welcome", (count) => {
    const show = document.getElementById("show");
    setTimeout(() => {
        show.innerHTML = count;
    }, 2000);
});

//getting dom elements
const usermsg = document.getElementById("usermsg");
const chatbox = document.getElementById("chatbox");
const submitmsg = document.getElementById("submitmsg");
const output = document.getElementById("output");
const userCount = document.getElementById("count");
const exit = document.getElementById("exit");
const submitLocation = document.getElementById("submitLocation");



socket.on("userUpdate", (value) => {
    userCount.innerHTML = value;
});

// exit button Clicked
exit.addEventListener("click", (event) => {
    event.preventDefault()
    window.close()
});

// ********************************************************************************************************************
                                            // Messages
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
    if (m === "A new User have joined") {
        const node = document.createElement("p");
        node.innerHTML = m;
        node.style.color = "green";
        chatbox.appendChild(node);
    } else if (m === "User left") {
        const node = document.createElement("p");
        node.innerHTML = m;
        node.style.color = "red";
        chatbox.appendChild(node);
    } else {
        const node = document.createElement("p");
        node.innerHTML = m;
        chatbox.appendChild(node);
    }

    submitmsg.disabled = false
    usermsg.focus()
});


// ********************************************************************************************************************
                                            // Location
// ********************************************************************************************************************

// Sending the location to server when button is clicked
submitLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("geo location is not support by the browser");
    } else {
        console.log(
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude);

                socket.emit(
                    "location",
                    "https://www.google.com/maps?q=" +
                    position.coords.latitude +
                    "," +
                    position.coords.longitude,
                    (message) => {
                        console.log("Message Delevired");
                    }
                );
            })
        );
    }
    submitLocation.disabled  = true
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


// const buttonInc = document.getElementById('incr');
// buttonInc.addEventListener('click' ,()=> {
// socket.emit('increment')
//  output.value = value
//
// })
