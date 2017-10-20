module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.body.userId
  },
  getFriendInfo: (req, res) => {
    //get user info as object including name and most recent photo
  }, 
  sendRequest: (req, res) => {
    //add req.body.userId to req.params.userId user's pending friend requests
  },
  getRequests: (req, res) => {
    //get all pending where userId = req.body.userId
  }, 
  confirmRequest: (req, res) => {
    //add req.params.userId to current user's friend list and vice versa
  }
}