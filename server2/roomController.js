const sequelize = require('sequelize')
const db = require('')

module.exports = {
  getAllRooms: (req, res) => {
    //get a user's array of room IDs using req.body.userId
  }, 
  createRoom: (req, res) => {
    //find where admin = user1 id and user = user2 id OR admin = user2 id and user1 id
    //using req.body.userId, req.params.userId2 
      //return roomId
    //else create room
      //return roomId
  }
}