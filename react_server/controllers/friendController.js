module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.params.userId
  },
  getFriendInfo: (req, res) => {
    //get user info as object using req.params.friendId
  }, 
  sendRequest: (req, res) => {
    //add req.body.userId to req.params.friendId friend's pending friend requests
  },
  getRequests: (req, res) => {
    //get all pending where userId = req.params.userId
  }, 
  acceptRequest: (req, res) => {
    //add req.params.friendId to current user's friend list and vice versa
  }
}