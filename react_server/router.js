const router = require('express').Router()
const roomController = require('./controllers/roomController')
const friendController = require('./controllers/friendController')

const User = require('./db/models/user')

router.get('/chat/:userId', roomController.getRooms);
router.get('/chats/:roomId', roomController.getPreview);

//only use from friends view
router.post('/chat', roomController.createRoom);

router.get('/friends/:userId', friendController.getFriendList)
// router.get('/friends/:friendId', friendController.getFriendInfo) 
router.get('/:friendId', friendController.getFriendProfile)

router.post('/addFriend', friendController.sendRequest)
router.get('/requests/:userId', friendController.getRequests)
router.post('/acceptRequest', friendController.acceptRequest)
router.post('deleteRequest', friendController.deleteRequest)

router.post('/blockUser', friendController.blockUser)

router.get('/search/:firstName/:lastName', friendController.search)

router.post('/addUser', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    profile_image_url: req.body.image,
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    })
})

module.exports = router; 