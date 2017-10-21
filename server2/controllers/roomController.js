const sequelize = require('sequelize')
const db = require('')

module.exports = {
  getRooms: (req, res) => {
    //get a user's array of room IDs using req.params.userId
  }, 
  createRoom: (req, res) => {
    //find where admin = userId and user = friendId OR admin = friendId and userId
    //using req.body.userId, req.params.friendId 
      //return roomId
    //else create room
      //return roomId
  },
  getRoomInfo: (req, res) => {
    //get an object using req.params.roomId with admin, user, most recent message, time created at
  }
}