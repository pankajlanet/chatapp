const generateMessage = (msg,name = "unknown",color)=> {

    const colorlist = ["alert alert-primary","alert alert-secondary" ,"alert alert-success","alert alert-danger","alert alert-warning","alert alert-info","alert alert-dark"]

    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seconds = date.getSeconds()

    return {
        color : color,
        name : name,
        text : msg,
        createdAt : hour + ":" + minute + ":" + seconds
    }

}

module.exports = {generateMessage}