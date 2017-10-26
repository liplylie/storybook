const express = require('express')
const router = express.Router() 
const roomController = require('./controllers/friendController')
const friendController = require('./controllers/friendController')

router.get('/chats/:userId', roomController.getRooms);
router.get('/chats/:roomId', roomController.getPreview)

//only use from friends view
router.post('/chat', roomController.createRoom);

router.get('/friends/:userId', friendController.getFriends)
router.get('/friends/:friendId', friendController.getFriendInfo) 

router.post('/addFriend', friendController.addFriend)
router.get('/requests/:userId', friendController.getRequests)
router.post('/acceptRequest', friendController.acceptFriend)

router.post('/blockFriend', friendController.blockUser)

router.get('/search/:firstName/:lastName')