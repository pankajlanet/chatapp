const generateMessage = (msg)=> {

    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seconds = date.getSeconds()

    return {
        text : msg,
        createdAt : hour + ":" + minute + ":" + seconds
    }

}

module.exports = {generateMessage}