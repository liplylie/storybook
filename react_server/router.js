const router = require('express').Router()
const roomController = require('./controllers/roomController')
const friendController = require('./controllers/friendController')

router.get('/chats/:userId', roomController.getRooms);
router.get('/chats/:roomId', roomController.getPreview)

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

module.exports = router; 