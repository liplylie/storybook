const express = require('express')
const router = express.Router() 
const roomController = require('./controllers/friendController')
const friendController = require('./controllers/friendController')

router.get('/chats/:userId', roomController.getRooms);
router.get('/chats/:roomId', roomController.getRoomInfo)

//only use from friends view
router.post('/chat/:friendId', roomController.createRoom);

router.get('/friends/:userId', friendController.getFriends)
router.get('/friends/:friendId', friendController.getFriendInfo) 

router.post('/addFriend/:friendId', friendController.addFriend)
router.get('/requests/:userId', friendController.getRequests)
router.post('/acceptRequest/:friendId', friendController.acceptFriend)