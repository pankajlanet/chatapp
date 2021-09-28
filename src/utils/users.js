const users= [{id:12 , username:"test" , room :"random"} ,{id:12 , username:"anish" , room :"random"},{id:12 , username:"kamal" , room :"another"}] 
 //add user, remove User , getUser , getUser in Room 

//*************************************************************************************************** */
                                    // Adding User
//*************************************************************************************************** */

 const addUser = ({id,username , room })=> {

    const colorlist = ["alert alert-primary","alert alert-secondary" ,"alert alert-success","alert alert-danger","alert alert-warning","alert alert-info","alert alert-dark"]


  // validating the data
    if(!username && !room)
    {
        return {error : "UserName and room is required "}
    }
    // Cleaning the Data
    username =  username.trim().toLowerCase();
    room = room.trim().toLowerCase();
  

    //Checking the existing user
        const existingUser = users.find(user=> {
            return user.room === room &&  user.username == username
        })
        if(existingUser)
        {
            return {
                error : "UserName is already in use"
            }
        }
    
        // storing the user
        const user = {id , username , room ,color : colorlist[Math.floor(Math.random()*colorlist.length)] }
        users.push(user)
        return{user}



 }

 //*************************************************************************************************** */
                                    // Removing User
//*************************************************************************************************** */
const removeUser = (id)=> {
    if(!id )
    {
        return {
            error:"Please enter the id to remove user"
        }
    }

    const index  = users.findIndex(user => user.id === id)


    if(index !== -1)
    {
        return users.splice(index,1)[0]
    }


}



 //*************************************************************************************************** */
                                    // Get User
//*************************************************************************************************** */

    const getUser = (id)=> {
        if(!id){
            return{
                error : "Please enter the user id to remove the user"
            }
        }

        const User = users.find(user=> user.id === id);
        return User 

        
    }


//*************************************************************************************************** */
                                    // Get User of a room
//*************************************************************************************************** */

const getUsersInRoom = (room)=> {
    if(!room)
    {
        return {error  : "Please enter the room name to get details"}
    }

    room = room.trim().toLowerCase();

    const userInSameRoom =  users.filter( user   =>user.room === room )

    return userInSameRoom
}



 //*************************************************************************************************** */
                                    // Testing
//*************************************************************************************************** */
//  console.log( "Adding a user :" , addUser({id:12 , username:"Test" , room :"random"}))   
//  console.log( "User is the array are :",  users)

// removeUser(12 )
// console.log( "User is the array are :",  users)


// console.log( getUser(12))

// console.log(users)

// console.log("user in same room are : " , getUsersInRoom('random'))


module.exports = { getUser,addUser,removeUser, getUsersInRoom}